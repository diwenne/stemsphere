"use client";

import { motion } from "framer-motion";

export function RainbowRibbon() {
  const viewWidth = 1600;
  const viewHeight = 9000;

  const yOffset = -650;

  const colors = [
    "#CE6BFF",
    "#9B72FF",
    "#4FC3F7",
    "#6BCB77",
    "#FFE156",
    "#FFB347",
    "#FF8A8A",
  ];

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

  function buildMainPath(): string {
    return [
      // ═══════════════════════════════════════════════
      // HERO — enter from beyond left edge, sweep gently rightward
      "M -200 400",
      "C 100 480, 400 540, 700 580",
      "C 1000 620, 1300 640, 1600 650",
      "L 2200 660",

      // ═══════════════════════════════════════════════
      // RE-ENTER from right side, begin serpentine through content
      "M 1800 1100",
      "C 1600 1160, 1350 1240, 1100 1320",

      // Sweep across to far left
      "C 800 1440, 450 1520, 200 1660",
      // Soft S-bend — curving back right
      "C 0 1780, 30 1940, 220 2040",
      // Flow across to far right
      "C 460 2160, 800 2180, 1100 2240",
      // Continue rightward, gentle rise
      "C 1300 2280, 1460 2380, 1480 2530",
      // Smooth arc back leftward
      "C 1500 2680, 1360 2800, 1100 2880",
      // Sweep across to far left
      "C 800 2980, 460 3030, 220 3130",
      // Gentle leftward descent
      "C 50 3210, -40 3360, 20 3500",
      // S-curve — rising back rightward
      "C 80 3640, 240 3740, 480 3820",
      // Flowing rightward across page
      "C 720 3900, 1020 3940, 1260 4030",
      // Soft rightward arc
      "C 1440 4100, 1520 4240, 1480 4400",
      // Back leftward — big gentle swing
      "C 1440 4560, 1260 4660, 1020 4730",
      // Continue left across page
      "C 720 4820, 380 4880, 160 4980",
      // Soft bottom-left turn
      "C 0 5070, -50 5220, 40 5360",
      // S-curve rightward
      "C 130 5500, 340 5580, 580 5650",
      // Flow across to far right — extra curl
      "C 820 5720, 1100 5740, 1350 5800",
      // Arc back leftward
      "C 1500 5840, 1540 5920, 1460 6020",
      // Swing back left
      "C 1380 6120, 1140 6180, 900 6220",
      // S-curve rightward again
      "C 660 6350, 440 6450, 300 6600",
      // Sharp turn right towards footer
      "C 180 6750, 200 6900, 400 7000",
      // Large sweep to the right
      "C 600 7100, 900 7150, 1200 7250",
      // Loop back left
      "C 1400 7350, 1300 7450, 1000 7550",
      // Final sharp turn right
      "C 700 7650, 500 7750, 600 7850",
      // Sweep right into the footer area
      "C 850 8050, 1200 8150, 1500 8350",
      // Straight diagonal exit
      "L 2400 8800",

      // ═══════════════════════════════════════════════
      // FOOTER SWEEP
      "M -200 8500",
      "C 200 8550, 500 8600, 800 8620",
      "L 1400 8650",
    ].join(" ");
  }

  const mainPath = buildMainPath();

  function getStrokeWidth(layerIndex: number): number {
    return totalRibbonWidth - layerIndex * stripeWidth;
  }

  return (
    <motion.div
      animate={{ 
        y: [0, -15, 0],
      }}
      transition={{ 
        duration: 5, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      style={{
        position: "absolute",
        top: yOffset,
        left: 0,
        width: "100%",
        bottom: 0,
        pointerEvents: "none",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      <svg
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="xMinYMin slice"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* 3D Shadow layer */}
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
              strokeLinecap="butt"
              strokeLinejoin="round"
              opacity={0.5}
              transform={`translate(${shadowOffset}, ${shadowOffset})`}
            />
          );
        })}

        {/* Main rainbow */}
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
              strokeLinecap="butt"
              strokeLinejoin="round"
            />
          );
        })}

        {/* Glossy highlight */}
        <path
          d={mainPath}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={totalRibbonWidth * 0.35}
          strokeLinecap="butt"
          strokeLinejoin="round"
        />

        {/* Thin bright highlight */}
        <path
          d={mainPath}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={2}
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}