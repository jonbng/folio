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
  const [isMounted, setIsMounted] = useState(false);

  const [dynamicStyle, setDynamicStyle] = useState({});
  const [zIndex, setZIndex] = useState(0);
  const [floatParams, setFloatParams] = useState({
    duration: defaultDuration,
    height: defaultHeight,
    delay: 0,
  });
  const [curveParams, setCurveParams] = useState({
    x1: 0,
    y1: defaultCurveY1,
    x2: 0,
    y2: defaultCurveY2,
  });
  const [formattedDate, setFormattedDate] = useState("");

  const floatVariants = {
    float: {
      y: [-floatParams.height, 0, -floatParams.height],
      transition: {
        y: {
          duration: floatParams.duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: floatParams.delay,
        },
      },
    },
  };

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
          delay: staticParams.delay,
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
        const randomDelay = Math.random() * 2;
        setFloatParams({
          duration: randomDuration,
          height: randomHeight,
          delay: randomDelay,
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
      setIsMounted(true);
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
    <div
      className={getOuterDivClassName()}
      style={
        isMounted
          ? { ...dynamicStyle, zIndex: zIndex }
          : { opacity: 0, zIndex: 0 }
      }
    >
      <motion.div
        variants={floatVariants}
        animate={isMounted && layoutMode !== "static" ? "float" : ""}
        style={{ width: "fit-content" }}
      >
        <motion.div
          className={`w-24 h-24 ${layoutMode === "mobile" ? "sm:w-20 sm:h-20" : ""} rounded-full flex items-center justify-center relative cursor-pointer`}
          style={{
            background: color.bg,
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
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
          <span className="text-lg font-bold text-white text-center px-2 z-10 drop-shadow-lg">
            {entry.name.split(" ")[0]}
          </span>
        </motion.div>

        <div className="relative h-4 w-8 mx-auto" style={{ marginTop: "-2px" }}>
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderBottom: `10px solid ${color.knot}`,
              filter: "brightness(0.9)",
            }}
          ></div>
        </div>

        <div className="h-24 relative">
          <svg
            width="30"
            height="100"
            viewBox="0 0 30 100"
            fill="none"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <path d={svgPathD} stroke="black" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <AnimatePresence>
          {showTooltip && (
            <motion.div
              className={`absolute bottom-full mb-2 w-64 ${layoutMode === "mobile" ? "sm:w-72" : ""} bg-white rounded-lg shadow-lg p-4 z-50`}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              style={{
                right: "50%",
                translateX: "50%",
                transformOrigin: "bottom center",
              }}
            >
              <div className="flex items-baseline justify-between mb-1">
                <div className="text-sm text-gray-500">{formattedDate}</div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <div className="font-bold text-gray-800">{entry.name}</div>
              </div>
              <div className="text-gray-600">{entry.message}</div>
              <div
                className="absolute w-4 h-4 bg-white transform rotate-45 left-1/2 -bottom-2 -ml-2"
                style={{ boxShadow: "2px 2px 5px rgba(0,0,0,0.1)" }}
              ></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export function getBalloonColor(colorName: string) {
  const colors: Record<
    string,
    { bg: string; highlight: string; knot: string }
  > = {
    blue: {
      bg: "rgba(135, 206, 250, 0.8)",
      highlight: "rgba(255, 255, 255, 0.6)",
      knot: "#87cefa",
    },
    pink: {
      bg: "rgba(255, 182, 193, 0.8)",
      highlight: "rgba(255, 255, 255, 0.6)",
      knot: "#ffb6c1",
    },
    yellow: {
      bg: "rgba(255, 215, 0, 0.8)",
      highlight: "rgba(255, 255, 255, 0.6)",
      knot: "#ffd700",
    },
    green: {
      bg: "rgba(152, 251, 152, 0.8)",
      highlight: "rgba(255, 255, 255, 0.6)",
      knot: "#98fb98",
    },
    purple: {
      bg: "rgba(221, 160, 221, 0.8)",
      highlight: "rgba(255, 255, 255, 0.6)",
      knot: "#dda0dd",
    },
    orange: {
      bg: "rgba(255, 160, 122, 0.8)",
      highlight: "rgba(255, 255, 255, 0.6)",
      knot: "#ffa07a",
    },
  };
  return colors[colorName] || colors.blue;
}
