"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { GuestbookEntry } from "@/types/guestbook";

const defaultDuration = 4.5;
const defaultHeight = 27.5;
const defaultCurveY1 = 40;
const defaultCurveY2 = 75;
const MOBILE_STAGGER_OFFSET = "80px";

export default function Balloon({
  entry,
  index,
  layoutMode = "desktop",
}: {
  entry: GuestbookEntry;
  index: number;
  layoutMode?: "desktop" | "mobile" | "inline" | "static";
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dynamicStyle, setDynamicStyle] = useState({});
  const [zIndex, setZIndex] = useState(0);
  const [floatParams, setFloatParams] = useState<{
    duration: number;
    height: number;
    delay: number;
    offset: string;
  }>({
    duration: defaultDuration,
    height: defaultHeight,
    delay: 0,
    offset: "0s",
  });
  const [curveParams, setCurveParams] = useState({
    x1: 0,
    y1: defaultCurveY1,
    x2: 0,
    y2: defaultCurveY2,
  });
  const [formattedDate, setFormattedDate] = useState("");

  // Static parameters for static layout mode
  const staticParams = {
    duration: defaultDuration,
    height: defaultHeight,
    delay: 0,
    curveX1: 11,
    curveY1: defaultCurveY1,
    curveX2: -5,
    curveY2: defaultCurveY2,
  };

  useEffect(() => {
    const calculatePositions = () => {
      if (layoutMode === "static") {
        setFloatParams({
          duration: staticParams.duration,
          height: staticParams.height,
          delay: 0,
          offset: "0s",
        });
        setCurveParams({
          x1: staticParams.curveX1,
          y1: staticParams.curveY1,
          x2: staticParams.curveX2,
          y2: staticParams.curveY2,
        });
      } else {
        const randomDuration = 3 + Math.random() * 3;
        const randomHeight = 15 + Math.random() * 25;
        const randomOffset = `${Math.random() * -100}%`; // Random offset between -100% and 0%
        setFloatParams({
          duration: randomDuration,
          height: randomHeight,
          delay: 0,
          offset: randomOffset,
        });

        const randomCurveX1 = Math.random() * 30 - 15;
        const randomCurveY1 = 30 + Math.random() * 20;
        const randomCurveX2 = Math.random() * 30 - 15;
        const randomCurveY2 = 60 + Math.random() * 30;
        setCurveParams({
          x1: randomCurveX1,
          y1: randomCurveY1,
          x2: randomCurveX2,
          y2: randomCurveY2,
        });
      }

      try {
        const date = new Date(entry.timestamp);
        setFormattedDate(date.toLocaleString());
      } catch (error) {
        console.error("Error formatting date:", error);
        setFormattedDate("Just now");
      }

      let calculatedStyle: React.CSSProperties = { opacity: 1 };

      if (layoutMode === "desktop") {
        const randomXOffset = Math.random() * 60 - 30;
        const randomYOffset = Math.random() * 50 - 25;

        let gridCols = 5;
        const containerPaddingX = 32;
        const estimatedItemWidth = 165;

        let availableWidth = 1000;
        const leftPadding = containerPaddingX / 2;

        if (typeof window !== "undefined") {
          const containerWidth = window.innerWidth;
          availableWidth = containerWidth - containerPaddingX;
          gridCols = Math.max(
            1,
            Math.floor(
              (availableWidth - containerPaddingX) / estimatedItemWidth,
            ),
          );
        }

        const row = Math.floor(index / gridCols);
        const col = index % gridCols;

        const actualCellWidthPixels =
          (availableWidth - containerPaddingX * 4) / gridCols;

        const absoluteCellLeftEdgePixels =
          leftPadding + col * actualCellWidthPixels;

        const absoluteCenterXPixels =
          absoluteCellLeftEdgePixels + actualCellWidthPixels / 2;

        const rowHeight = 160;
        const initialTopOffset = 60;
        const calculatedBaseY = row * rowHeight + initialTopOffset;
        const finalY = calculatedBaseY + randomYOffset;
        const finalZIndex = Math.floor(finalY);

        calculatedStyle = {
          ...calculatedStyle,
          position: "absolute",
          left: `${absoluteCenterXPixels}px`,
          top: `${finalY}px`,
          transform: `translateX(calc(-50% + ${randomXOffset}px))`,
          opacity: 1,
        };
        setZIndex(finalZIndex);
      } else if (layoutMode === "mobile") {
        const staggerX =
          index % 2 === 0 ? `-${MOBILE_STAGGER_OFFSET}` : MOBILE_STAGGER_OFFSET;
        calculatedStyle = {
          ...calculatedStyle,
          transform: `translateX(${staggerX})`,
          position: "relative",
        };
        setZIndex(0);
      } else if (layoutMode === "static") {
        calculatedStyle = {
          ...calculatedStyle,
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
        };
        setZIndex(0);
      } else {
        setZIndex(0);
      }

      setDynamicStyle(calculatedStyle);
    };

    // Initial calculation
    calculatePositions();

    // Add resize listener
    if (typeof window !== "undefined") {
      window.addEventListener("resize", calculatePositions);

      // Cleanup
      return () => {
        window.removeEventListener("resize", calculatePositions);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutMode, index, entry.timestamp]);

  const color = getBalloonColor(entry.color);
  const svgPathD = `M15,0 C${15 + curveParams.x1},${curveParams.y1} ${
    15 + curveParams.x2
  },${curveParams.y2} 15,100`;

  const getOuterDivClassName = () => {
    switch (layoutMode) {
      case "mobile":
        return "w-fit -mb-24";
      case "inline":
        return "w-fit";
      case "static":
        return "w-full flex justify-center";
      case "desktop":
      default:
        return "";
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes float-${index} {
            0%, 100% {
              transform: translateY(-${floatParams.height}px);
            }
            50% {
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div
        className={getOuterDivClassName()}
        style={{ ...dynamicStyle, zIndex: zIndex }}
      >
        <div
          style={{
            width: "fit-content",
            animation:
              layoutMode !== "static"
                ? `float-${index} ${floatParams.duration}s ease-in-out infinite`
                : "none",
            animationDelay:
              layoutMode !== "static" ? floatParams.offset : undefined,
          }}
        >
          <motion.div
            className="cursor-pointer relative"
            style={{ transformOrigin: "top center" }}
            onHoverStart={() => setShowTooltip(true)}
            onHoverEnd={() => setShowTooltip(false)}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            whileTap={{ scale: 1 }}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            role="button"
            tabIndex={0}
          >
            <div
              className={`w-[88px] h-[104px] ${
                layoutMode === "mobile" ? "sm:w-[72px] sm:h-[86px]" : ""
              } flex items-center justify-center relative`}
              style={{
                borderRadius: "50% 50% 50% 50% / 45% 45% 55% 55%",
                background: `radial-gradient(circle at 35% 30%, ${color.highlight}, ${color.bg} 55%, ${color.dark} 100%)`,
                boxShadow: `inset -4px -6px 12px rgba(0,0,0,0.08), 0 4px 12px ${color.shadow}`,
              }}
            >
              {/* Shine highlight */}
              <div
                className="absolute w-[30%] h-[35%] rounded-full opacity-50 pointer-events-none"
                style={{
                  top: "15%",
                  left: "20%",
                  background: "radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, transparent 70%)",
                }}
              />
              <span className="text-lg font-bold text-white text-center px-2 z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                {entry.name.split(" ")[0]}
              </span>
            </div>

            {/* Knot - SVG loop */}
            <div className="relative flex justify-center z-10" style={{ marginTop: "-1px" }}>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path
                  d="M7 0 C4 0, 2 3, 4 5 C5.5 6.5, 7 4, 7 4 C7 4, 8.5 6.5, 10 5 C12 3, 10 0, 7 0Z"
                  fill={color.knot}
                  style={{ filter: "brightness(0.82)" }}
                />
              </svg>
            </div>

            {/* String */}
            <div className="h-24 relative" style={{ marginTop: "-7px" }}>
              <svg
                width="30"
                height="100"
                viewBox="0 0 30 100"
                fill="none"
                className="absolute left-1/2 -translate-x-1/2"
                aria-hidden="true"
              >
                <path d={svgPathD} stroke={color.knot} strokeWidth="0.8" fill="none" opacity="0.5" />
              </svg>
            </div>
          </motion.div>

          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className={`absolute bottom-full mb-2 w-64 ${layoutMode === "mobile" ? "sm:w-72" : ""} bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-4 z-50`}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  right: "50%",
                  translateX: "50%",
                  transformOrigin: "bottom center",
                }}
              >
                <div className="flex items-baseline justify-between mb-1">
                  <div className="text-xs text-[var(--muted-foreground)]">{formattedDate}</div>
                </div>
                <div className="flex items-baseline gap-2 mb-1.5">
                  <div className="font-semibold text-[var(--foreground)]">{entry.name}</div>
                </div>
                <div className="text-sm text-[var(--muted-foreground)] leading-relaxed">{entry.message}</div>
                <div
                  className="absolute w-3 h-3 bg-[var(--card)] border-r border-b border-[var(--border)] transform rotate-45 left-1/2 -bottom-1.5 -ml-1.5"
                ></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export function getBalloonColor(colorName: string) {
  const colors: Record<
    string,
    { bg: string; highlight: string; dark: string; shadow: string; knot: string }
  > = {
    blue: {
      bg: "rgba(135, 206, 250, 0.85)",
      highlight: "rgba(190, 230, 255, 0.95)",
      dark: "rgba(90, 160, 220, 0.9)",
      shadow: "rgba(90, 160, 220, 0.2)",
      knot: "#6db8e8",
    },
    pink: {
      bg: "rgba(255, 182, 193, 0.85)",
      highlight: "rgba(255, 220, 228, 0.95)",
      dark: "rgba(220, 140, 155, 0.9)",
      shadow: "rgba(220, 140, 155, 0.2)",
      knot: "#e8a0ad",
    },
    yellow: {
      bg: "rgba(255, 220, 60, 0.85)",
      highlight: "rgba(255, 240, 150, 0.95)",
      dark: "rgba(220, 180, 20, 0.9)",
      shadow: "rgba(220, 180, 20, 0.2)",
      knot: "#d4aa20",
    },
    green: {
      bg: "rgba(140, 230, 140, 0.85)",
      highlight: "rgba(190, 250, 190, 0.95)",
      dark: "rgba(100, 190, 100, 0.9)",
      shadow: "rgba(100, 190, 100, 0.2)",
      knot: "#78c878",
    },
    purple: {
      bg: "rgba(200, 150, 210, 0.85)",
      highlight: "rgba(230, 195, 240, 0.95)",
      dark: "rgba(165, 115, 180, 0.9)",
      shadow: "rgba(165, 115, 180, 0.2)",
      knot: "#b088be",
    },
    orange: {
      bg: "rgba(255, 160, 100, 0.85)",
      highlight: "rgba(255, 200, 160, 0.95)",
      dark: "rgba(220, 120, 70, 0.9)",
      shadow: "rgba(220, 120, 70, 0.2)",
      knot: "#d88850",
    },
    teal: {
      bg: "rgba(100, 210, 200, 0.85)",
      highlight: "rgba(160, 235, 228, 0.95)",
      dark: "rgba(60, 170, 160, 0.9)",
      shadow: "rgba(60, 170, 160, 0.2)",
      knot: "#48aaa0",
    },
  };
  return colors[colorName] || colors.blue;
}
