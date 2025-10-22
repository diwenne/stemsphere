import { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

interface BlocklyEditorProps {
  value: string;
  onChange: (code: string, xml: string) => void;
}

export function BlocklyEditor({ value, onChange }: BlocklyEditorProps) {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (!blocklyDiv.current) return;

    const workspace = Blockly.inject(blocklyDiv.current, {
      toolbox: {
        kind: 'flyoutToolbox',
        contents: [
          {
            kind: 'block',
            type: 'controls_if',
          },
          {
            kind: 'block',
            type: 'controls_repeat_ext',
          },
          {
            kind: 'block',
            type: 'logic_compare',
          },
          {
            kind: 'block',
            type: 'math_number',
          },
          {
            kind: 'block',
            type: 'math_arithmetic',
          },
          {
            kind: 'block',
            type: 'text',
          },
          {
            kind: 'block',
            type: 'text_print',
          },
          {
            kind: 'block',
            type: 'variables_get',
          },
          {
            kind: 'block',
            type: 'variables_set',
          },
        ],
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
      },
      trashcan: true,
    });

    workspaceRef.current = workspace;

    if (value) {
      try {
        const xml = Blockly.utils.xml.textToDom(value);
        Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, workspace);
      } catch (error) {
        console.error('Error loading Blockly workspace:', error);
      }
    }

    const handleChange = () => {
      if (!workspaceRef.current) return;

      const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
      const xml = Blockly.Xml.workspaceToDom(workspaceRef.current);
      const xmlText = Blockly.Xml.domToText(xml);

      onChange(code, xmlText);
    };

    workspace.addChangeListener(handleChange);

    return () => {
      workspace.dispose();
    };
  }, []);

  return (
    <div
      ref={blocklyDiv}
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
}
