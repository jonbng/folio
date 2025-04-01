import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export interface BalloonEntry {
  id: string;
  name: string;
  username: string;
  message: string;
  color: string;
  timestamp: string;
}

export default function Balloon({
  entry,
  index,
  inALine = false,
}: {
  entry: BalloonEntry;
  index: number;
  inALine?: boolean;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const stringRef = useRef<SVGPathElement>(null);

  // Only use random offsets and grid layout when NOT in a line
  const xOffset = useRef(Math.random() * 80 - 40); // -40px to +40px
  const yOffset = useRef(Math.random() * 50 - 25); // -25px to +25px

  // Random animation parameters (always applied)
  const floatDuration = useRef(3 + Math.random() * 3); // 3-6 seconds
  const floatHeight = useRef(15 + Math.random() * 25); // 15-40px float height
  const delayOffset = useRef(Math.random() * 2); // 0-2 second delay

  // Random string curve values (always applied)
  const curveX1 = useRef(Math.random() * 30 - 15); // -15px to +15px
  const curveY1 = useRef(30 + Math.random() * 20); // 30px to 50px
  const curveX2 = useRef(Math.random() * 30 - 15); // -15px to +15px
  const curveY2 = useRef(60 + Math.random() * 30); // 60px to 90px

  // When not using inALine layout, calculate grid positions
  let baseX = 0;
  let baseY = 0;
  if (!inALine) {
    const gridCols = 7;
    const row = Math.floor(index / gridCols);
    const col = index % gridCols;
    baseX = (col / gridCols) * 100;
    baseY = row * 120;
  }

  // Only use offsets when not inALine
  const computedXOffset = inALine ? 0 : xOffset.current;
  const computedYOffset = inALine ? 0 : yOffset.current;
  const computedBaseX = inALine ? 0 : baseX;
  const computedBaseY = inALine ? 0 : baseY;

  // Calculate final position (only used when not inALine)
  const finalY = computedBaseY + computedYOffset;
  const zIndex = Math.floor(finalY);

  // Format timestamp for display
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const timestampInMs = Number(entry.timestamp);
    setFormattedDate(new Date(timestampInMs).toLocaleString());
  }, [entry.timestamp]);

  // Framer Motion animation variants
  const floatVariants = {
    float: {
      y: [-floatHeight.current, 0, -floatHeight.current],
      transition: {
        y: {
          duration: floatDuration.current,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: delayOffset.current,
        },
      },
    },
  };

  // Get balloon color based on entry color
  const color = getBalloonColor(entry.color);

  return (
    <div
      className={inALine ? "w-fit" : "absolute"}
      // Only add absolute positioning when NOT inALine; otherwise let flex handle layout
      style={
        !inALine
          ? {
              left: `calc(${computedBaseX}% + ${computedXOffset}px)`,
              top: `${finalY}px`,
              zIndex: zIndex,
            }
          : {}
      }
      suppressHydrationWarning
    >
      <motion.div
        variants={floatVariants}
        animate="float"
        style={{ willChange: "transform" }}
      >
        {/* Balloon */}
        <motion.div
          className="w-24 h-24 rounded-full flex items-center justify-center relative cursor-pointer"
          style={{
            background: color.bg,
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
          onHoverStart={() => setShowTooltip(true)}
          onHoverEnd={() => setShowTooltip(false)}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          whileTap={{ scale: 1 }}
        >
          {/* Text */}
          <span className="text-lg font-bold text-white text-center px-2 z-10 drop-shadow-lg">
            {entry.name}
          </span>
        </motion.div>

        {/* Triangle knot */}
        <div
          className="relative h-4 w-8 mx-auto"
          style={{
            marginTop: "-2px",
          }}
        >
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

        {/* String */}
        <div className="h-24 relative">
          <svg
            width="30"
            height="100"
            viewBox="0 0 30 100"
            fill="none"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <path
              ref={stringRef}
              d={`M15,0 C${15 + curveX1.current},${curveY1.current} ${
                15 + curveX2.current
              },${curveY2.current} 15,100`}
              stroke="black"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              className="absolute bottom-full mb-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50"
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
                <div className="text-xs text-gray-400">{entry.username}</div>
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

// Helper function to get balloon colors based on color name
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
