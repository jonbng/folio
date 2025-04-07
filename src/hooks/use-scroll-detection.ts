import { useEffect, useState } from "react";

export function useScrollDetection(
  guestbookRef: React.RefObject<HTMLDivElement>,
  isExpanded: boolean,
  updateCollapsedPosition: () => void
) {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    if (isExpanded) return;
    let scrollTimeout: number;

    const handleScroll = () => {
      setIsFixed(false);
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        if (!guestbookRef.current) return;
        const rect = guestbookRef.current.getBoundingClientRect();
        const fullyInView =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= window.innerHeight &&
          rect.right <= window.innerWidth;
        if (fullyInView) {
          requestAnimationFrame(() => {
            updateCollapsedPosition();
            setIsFixed(true);
          });
        }
      }, 100);
    };

    requestAnimationFrame(updateCollapsedPosition);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isExpanded, guestbookRef, updateCollapsedPosition]);

  return isFixed;
}
