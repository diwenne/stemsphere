import { loadPyodide, PyodideInterface } from 'pyodide';

export interface ExecutionResult {
  success: boolean;
  output: string;
  executionTime?: number;
  error?: string;
  hasGraphics?: boolean;
  canvasDataUrl?: string;
}

export class PyodideExecutionService {
  private pyodide: PyodideInterface | null = null;
  private isInitializing = false;
  private initPromise: Promise<void> | null = null;
  private inputCallback: ((prompt: string) => Promise<string>) | null = null;
  private isExecuting = false;
  private shouldInterrupt = false;

  async initialize(): Promise<void> {
    if (this.pyodide) return;

    if (this.isInitializing && this.initPromise) {
      return this.initPromise;
    }

    this.isInitializing = true;
    this.initPromise = (async () => {
      try {
        console.log('Loading Pyodide...');
        this.pyodide = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.0/full/',
        });
        console.log('Pyodide loaded successfully (turtle ready)');
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        throw error;
      } finally {
        this.isInitializing = false;
      }
    })();

    return this.initPromise;
  }

  setInputCallback(callback: (prompt: string) => Promise<string>) {
    this.inputCallback = callback;
  }

  interrupt() {
    this.shouldInterrupt = true;
    // Interrupt Pyodide execution by setting interrupt buffer
    if (this.pyodide && this.isExecuting) {
      try {
        const interruptBuffer = new Int32Array(new SharedArrayBuffer(4));
        this.pyodide.setInterruptBuffer(interruptBuffer);
        Atomics.store(interruptBuffer, 0, 2);
      } catch (e) {
        console.error('Failed to interrupt Pyodide:', e);
      }
    }
  }

  isRunning(): boolean {
    return this.isExecuting;
  }

  async executeCode(code: string): Promise<ExecutionResult> {
    const startTime = Date.now();
    this.isExecuting = true;
    this.shouldInterrupt = false;

    try {
      await this.initialize();

      if (!this.pyodide) {
        throw new Error('Pyodide not initialized');
      }

      // Setup input callback
      if (this.inputCallback) {
        (window as any).__input_callback__ = this.inputCallback;
      }

      // Capture stdout
      let output = '';
      this.pyodide.setStdout({
        batched: (msg: string) => {
          output += msg + '\n';
        },
      });

      // Register custom input function
      await this.pyodide.runPythonAsync(`
import builtins
import js
from pyodide.code import run_js

# Create async input function
async def custom_input(prompt=''):
    try:
        if prompt:
            print(prompt, end='', flush=True)
        result = await js.__input_callback__(str(prompt))
        print()  # newline after input
        return str(result)
    except Exception as e:
        print(f"\\nInput error: {e}")
        import traceback
        traceback.print_exc()
        return ""

# Replace built-in input
builtins.input = custom_input
print("Input callback registered successfully")
      `);

      // Check if code uses turtle
      const usesTurtle = code.includes('turtle');
      const usesMatplotlib = code.includes('matplotlib') || code.includes('pyplot');

      if (usesTurtle) {
        // Clean up any existing canvas from previous run
        const existingCanvas = document.getElementById('turtle-canvas');
        if (existingCanvas) {
          existingCanvas.remove();
        }

        // Reset turtle module globals in Python
        await this.pyodide.runPythonAsync(`
import sys
if 'turtle' in sys.modules:
    del sys.modules['turtle']
        `);

        // Inject a comprehensive canvas-based turtle implementation
        await this.pyodide.runPythonAsync(`
import js
from js import document, console
import math

# Shared canvas for all turtles (reset each run)
_shared_canvas = None
_shared_ctx = None
_drawing_canvas = None  # Separate canvas for just the drawings (no turtle)
_drawing_ctx = None

def _get_shared_canvas():
    global _shared_canvas, _shared_ctx, _drawing_canvas, _drawing_ctx
    if _shared_canvas is None:
        # Create main display canvas
        _shared_canvas = document.createElement('canvas')
        _shared_canvas.id = 'turtle-canvas'

        # High-DPI canvas for crisp graphics
        dpr = js.window.devicePixelRatio or 1
        _shared_canvas.width = 600 * dpr
        _shared_canvas.height = 400 * dpr
        _shared_canvas.style.width = '600px'
        _shared_canvas.style.height = '400px'

        _shared_ctx = _shared_canvas.getContext('2d')
        _shared_ctx.scale(dpr, dpr)

        # Create separate canvas for drawings only (no turtle cursor)
        _drawing_canvas = document.createElement('canvas')
        _drawing_canvas.width = 600 * dpr
        _drawing_canvas.height = 400 * dpr
        _drawing_ctx = _drawing_canvas.getContext('2d')
        _drawing_ctx.scale(dpr, dpr)

        # Clear both canvases with white background
        _shared_ctx.fillStyle = 'white'
        _shared_ctx.fillRect(0, 0, 600, 400)
        _drawing_ctx.fillStyle = 'white'
        _drawing_ctx.fillRect(0, 0, 600, 400)

        _shared_ctx.strokeStyle = 'black'
        _shared_ctx.lineWidth = 2
        _drawing_ctx.strokeStyle = 'black'
        _drawing_ctx.lineWidth = 2

        # Attach to a visible container if it exists, otherwise body
        container = document.getElementById('turtle-live-canvas-container')
        if container:
            container.appendChild(_shared_canvas)
        else:
            document.body.appendChild(_shared_canvas)
    return _shared_canvas, _shared_ctx

class Turtle:
    def __init__(self):
        global _drawing_ctx
        canvas, ctx = _get_shared_canvas()
        self.canvas = canvas
        self.ctx = ctx
        self.drawing_ctx = _drawing_ctx  # Separate context for lines only

        # Turtle state
        self.x = 300
        self.y = 200
        self.angle = 0  # facing right
        self.pen_down = True
        self.pen_color = 'black'
        self.pen_width = 2
        self.speed_val = 3
        self.is_visible = True

        self.ctx.strokeStyle = self.pen_color
        self.ctx.lineWidth = self.pen_width
        self.drawing_ctx.strokeStyle = self.pen_color
        self.drawing_ctx.lineWidth = self.pen_width

    def _refresh_display(self):
        """Redraw the display canvas with drawing + turtle"""
        global _drawing_canvas
        # Copy drawing canvas to display canvas
        self.ctx.drawImage(_drawing_canvas, 0, 0)
        # Draw turtle on top
        self._draw_turtle_only()

    def _draw_turtle_only(self):
        """Draw just the turtle cursor (called after refresh)"""
        if not self.is_visible:
            return

        self.ctx.save()
        self.ctx.translate(self.x, self.y)
        self.ctx.rotate(-math.radians(self.angle))

        # Draw turtle shape (triangle)
        self.ctx.beginPath()
        self.ctx.moveTo(10, 0)
        self.ctx.lineTo(-5, 5)
        self.ctx.lineTo(-5, -5)
        self.ctx.closePath()

        self.ctx.fillStyle = 'green'
        self.ctx.fill()
        self.ctx.strokeStyle = 'darkgreen'
        self.ctx.lineWidth = 1
        self.ctx.stroke()

        self.ctx.restore()

    def forward(self, distance):
        rad = math.radians(self.angle)
        new_x = self.x + distance * math.cos(rad)
        new_y = self.y - distance * math.sin(rad)

        # Draw line on drawing canvas (permanent)
        if self.pen_down:
            self.drawing_ctx.beginPath()
            self.drawing_ctx.moveTo(self.x, self.y)
            self.drawing_ctx.lineTo(new_x, new_y)
            self.drawing_ctx.stroke()

        self.x = new_x
        self.y = new_y

        # Refresh display (drawing + turtle)
        self._refresh_display()

        # Force browser to render this frame
        js.eval("void 0")

    def backward(self, distance):
        self.forward(-distance)

    def right(self, angle):
        self.angle -= angle
        self._refresh_display()

    def left(self, angle):
        self.angle += angle
        self._refresh_display()

    def penup(self):
        self.pen_down = False

    def pendown(self):
        self.pen_down = True

    def color(self, col):
        self.pen_color = col
        self.ctx.strokeStyle = col
        self.drawing_ctx.strokeStyle = col

    def speed(self, s):
        self.speed_val = s

    def hideturtle(self):
        self._clear_turtle()
        self.is_visible = False

    def showturtle(self):
        self.is_visible = True
        self._draw_turtle()

    def goto(self, x, y):
        # Convert to canvas coordinates (center is 300, 200)
        new_x = 300 + x
        new_y = 200 - y

        if self.pen_down:
            self.drawing_ctx.beginPath()
            self.drawing_ctx.moveTo(self.x, self.y)
            self.drawing_ctx.lineTo(new_x, new_y)
            self.drawing_ctx.stroke()

        self.x = new_x
        self.y = new_y
        self._refresh_display()

    def circle(self, radius, extent=360):
        # Draw a circle or arc
        steps = max(12, int(abs(radius) / 2))
        angle_step = extent / steps

        for _ in range(steps):
            self.forward(2 * math.pi * radius * angle_step / 360)
            self.left(angle_step)

# Default turtle instance
_default_turtle = None

def _get_default_turtle():
    global _default_turtle
    if _default_turtle is None:
        _default_turtle = Turtle()
    return _default_turtle

# Module-level functions that use the default turtle
def forward(distance):
    _get_default_turtle().forward(distance)

def backward(distance):
    _get_default_turtle().backward(distance)

def right(angle):
    _get_default_turtle().right(angle)

def left(angle):
    _get_default_turtle().left(angle)

def penup():
    _get_default_turtle().penup()

def pendown():
    _get_default_turtle().pendown()

def color(col):
    _get_default_turtle().color(col)

def speed(s):
    _get_default_turtle().speed(s)

def goto(x, y):
    _get_default_turtle().goto(x, y)

def circle(radius):
    _get_default_turtle().circle(radius)

def hideturtle():
    _get_default_turtle().hideturtle()

def showturtle():
    _get_default_turtle().showturtle()

def done():
    pass  # No-op in browser

class Screen:
    def setup(self, width=None, height=None):
        pass
    def bgcolor(self, color):
        pass

# Create a module-like object for turtle
import types
turtle_module = types.ModuleType('turtle')
turtle_module.Turtle = Turtle
turtle_module.Screen = Screen
turtle_module.forward = forward
turtle_module.backward = backward
turtle_module.right = right
turtle_module.left = left
turtle_module.penup = penup
turtle_module.pendown = pendown
turtle_module.color = color
turtle_module.speed = speed
turtle_module.goto = goto
turtle_module.circle = circle
turtle_module.hideturtle = hideturtle
turtle_module.showturtle = showturtle
turtle_module.done = done

# Make turtle importable
import sys
sys.modules['turtle'] = turtle_module
        `);
      }

      // Execute the user's code with proper async handling
      try {
        await this.pyodide.runPythonAsync(code);
      } catch (error: any) {
        const executionTime = Date.now() - startTime;
        this.isExecuting = false;

        // Parse error message for line number
        const errorMessage = error.message || String(error);
        const lineMatch = errorMessage.match(/line (\d+)/);
        const errorLine = lineMatch ? parseInt(lineMatch[1]) : undefined;

        return {
          success: false,
          output: output.trim(),
          error: errorMessage,
          executionTime,
        };
      }

      const executionTime = Date.now() - startTime;

      // Capture canvas if turtle was used
      let canvasDataUrl: string | undefined;
      if (usesTurtle) {
        try {
          // Small delay to ensure canvas is fully rendered
          await new Promise(resolve => setTimeout(resolve, 100));

          // Access canvas directly from JavaScript
          const canvas = document.getElementById('turtle-canvas') as HTMLCanvasElement;
          console.log('Canvas element found:', !!canvas);
          console.log('Canvas dimensions:', canvas?.width, 'x', canvas?.height);

          if (canvas) {
            try {
              canvasDataUrl = canvas.toDataURL('image/png');
              console.log('Canvas data URL captured successfully, length:', canvasDataUrl.length);
              console.log('Data URL preview:', canvasDataUrl.substring(0, 100));
            } catch (e) {
              console.error('Error calling toDataURL:', e);
            }
          } else {
            console.error('Canvas element not found in DOM');
            // Try to find any canvas elements
            const allCanvases = document.querySelectorAll('canvas');
            console.log('All canvas elements in DOM:', allCanvases.length);
          }
        } catch (e) {
          console.error('Error capturing canvas:', e);
        }
      }

      console.log('Execution complete:', {
        hasGraphics: !!(canvasDataUrl),
        canvasDataUrlLength: canvasDataUrl ? canvasDataUrl.length : 0,
        outputLength: output.length
      });

      this.isExecuting = false;

      return {
        success: true,
        output: output.trim() || 'Code executed successfully',
        executionTime,
        hasGraphics: !!(canvasDataUrl),
        canvasDataUrl: canvasDataUrl || undefined,
      };
    } catch (error: any) {
      this.isExecuting = false;
      return {
        success: false,
        output: '',
        error: error.message || 'An error occurred during execution',
      };
    }
  }
}

export const pyodideService = new PyodideExecutionService();
