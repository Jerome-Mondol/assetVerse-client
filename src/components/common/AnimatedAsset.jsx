import React, { useEffect, useRef } from "react";

// Simple floating asset animation (SVG box with floating effect)
const AnimatedAsset = () => {
  const assetRef = useRef(null);

  useEffect(() => {
    let frame;
    let t = 0;
    const animate = () => {
      t += 0.03;
      if (assetRef.current) {
        assetRef.current.style.transform = `translateY(${Math.sin(t) * 12}px)`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <svg
        ref={assetRef}
        width="90"
        height="90"
        viewBox="0 0 90 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg transition-transform duration-300"
      >
        <rect x="10" y="20" width="70" height="50" rx="12" fill="#2563eb" />
        <rect x="20" y="30" width="50" height="30" rx="6" fill="#fff" />
        <rect x="35" y="40" width="20" height="10" rx="2" fill="#2563eb" />
      </svg>
      <div className="mt-4 text-lg font-semibold text-blue-700 dark:text-blue-300 animate-pulse">
        AssetVerse in Motion
      </div>
    </div>
  );
};

export default AnimatedAsset;
