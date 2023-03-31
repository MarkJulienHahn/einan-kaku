import { useState, useEffect } from "react";

export default function useWindowDimensions() {
// FALLBACK FOR SSR IN NEXT.JS
  function getWindowDimensions() {
    if (typeof window !== "undefined") {
      const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
      return {
        windowWidth,
        windowHeight,
      };
    } else {
      const windowWidth = null;
      const windowHeight = null;
      return {
        windowWidth,
        windowHeight,
      }
    }
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
