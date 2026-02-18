"use client";

export function RainbowRibbon() {
  const viewWidth = 1600;
  const viewHeight = 6000;

  // ✏️ Adjust this to shift the entire ribbon up (negative) or down (positive)
  const yOffset = 0; // pixels

  // Vibrant rainbow colors — outermost to innermost
  const colors = [
    "#CE6BFF", // violet (outermost)
    "#9B72FF", // indigo
    "#4FC3F7", // blue
    "#6BCB77", // green
    "#FFE156", // yellow
    "#FFB347", // orange
    "#FF8A8A", // red (innermost)
  ];

  // Shadow colors for 3D depth
  const shadowColors = [
    "#A045D4",
    "#7150CC",
    "#2A96CC",
    "#3DA854",
    "#D4B830",
    "#D9902A",
    "#E06060",
  ];

  const stripeWidth = 14;
  const totalRibbonWidth = colors.length * stripeWidth;
  const shadowOffset = 4;

  // Organic, fluid, serpentine ribbon path
  // Flowing like a silk ribbon in the wind — squiggly, bent, playful
  function buildMainPath(): string {
    return [
      // Enter from upper-right, gentle swoop
      "M 1500 -60",
      "C 1400 80, 1200 180, 1000 260",
      // Wide sweep to far left
      "C 700 380, 350 450, 150 580",
      // Soft S-bend — curving back right
      "C -20 700, 50 860, 250 960",
      // Flow across to far right
      "C 500 1080, 850 1100, 1150 1160",
      // Continue rightward, gentle rise
      "C 1350 1200, 1500 1300, 1520 1450",
      // Smooth arc back leftward
      "C 1540 1600, 1400 1720, 1150 1800",
      // Sweep across to far left
      "C 850 1900, 500 1950, 250 2050",
      // Gentle leftward descent
      "C 80 2130, -20 2280, 30 2420",
      // S-curve — rising back rightward
      "C 80 2560, 250 2660, 500 2740",
      // Flowing rightward across page
      "C 750 2820, 1050 2860, 1300 2950",
      // Soft rightward arc
      "C 1480 3020, 1560 3160, 1520 3320",
      // Back leftward — big gentle swing
      "C 1480 3480, 1300 3580, 1050 3650",
      // Continue left across page
      "C 750 3740, 400 3800, 180 3900",
      // Soft bottom-left turn
      "C 20 3990, -40 4140, 50 4280",
      // S-curve rightward
      "C 140 4420, 350 4500, 600 4570",
      // Wide right sweep
      "C 900 4650, 1200 4700, 1420 4800",
      // Gentle arc turning left
      "C 1560 4880, 1580 5020, 1480 5160",
      // Sweeping leftward to exit
      "C 1350 5320, 1100 5420, 800 5520",
      // Flow off bottom-left
      "C 500 5620, 200 5740, 50 5880",
      "C -80 5980, -120 6080, -100 6150",
    ].join(" ");
  }

  const mainPath = buildMainPath();

  // Concentric stroke rendering — each stripe is drawn with a
  // stroke width that covers from the outer edge to its inner edge.
  // The outermost color is drawn first with the widest stroke,
  // then each inner color is drawn over it with a narrower stroke.
  // This ensures constant ribbon width regardless of curve direction.
  function getStrokeWidth(layerIndex: number): number {
    return totalRibbonWidth - layerIndex * stripeWidth;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: yOffset,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <svg
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* 3D Shadow layer — concentric strokes shifted down-right */}
        {colors.map((_, i) => {
          const sw = getStrokeWidth(i);
          if (sw <= 0) return null;
          return (
            <path
              key={`shadow-${i}`}
              d={mainPath}
              fill="none"
              stroke={shadowColors[i]}
              strokeWidth={sw}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.5}
              transform={`translate(${shadowOffset}, ${shadowOffset})`}
            />
          );
        })}

        {/* Main rainbow — concentric strokes, widest first */}
        {colors.map((color, i) => {
          const sw = getStrokeWidth(i);
          if (sw <= 0) return null;
          return (
            <path
              key={`main-${i}`}
              d={mainPath}
              fill="none"
              stroke={color}
              strokeWidth={sw}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}

        {/* Glossy highlight along the center of the ribbon */}
        <path
          d={mainPath}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={totalRibbonWidth * 0.35}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Thin bright highlight for extra gloss */}
        <path
          d={mainPath}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
