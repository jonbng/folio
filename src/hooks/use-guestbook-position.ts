import { useState, useCallback, useLayoutEffect } from "react";

export function useGuestbookPosition(
  guestbookRef: React.RefObject<HTMLDivElement>,
  isExpanded: boolean
) {
  const [absoluteStyle, setAbsoluteStyle] = useState({
    top: "0px",
    left: "0px",
    width: "0px",
    height: "0px",
  });
  const [fixedStyle, setFixedStyle] = useState({
    top: "0px",
    left: "0px",
    width: "0px",
    height: "0px",
  });
  const [hasInitialPosition, setHasInitialPosition] = useState(false);

  // Calculate and update positioning styles
  const updateCollapsedPosition = useCallback(() => {
    if (!guestbookRef.current) return;
    const rect = guestbookRef.current.getBoundingClientRect();
    setAbsoluteStyle({
      top: `${rect.top + window.scrollY}px`,
      left: `${rect.left + window.scrollX}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
    setFixedStyle({
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
  }, [guestbookRef]);

  // Initial measurement after layout settles (e.g. after an animation)
  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      updateCollapsedPosition();
      setHasInitialPosition(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, [updateCollapsedPosition]);

  // Update positioning on window resize when not expanded
  useLayoutEffect(() => {
    if (isExpanded) return;
    const handleResize = () => updateCollapsedPosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded, updateCollapsedPosition]);

  return {
    absoluteStyle,
    fixedStyle,
    hasInitialPosition,
    updateCollapsedPosition,
  };
}
