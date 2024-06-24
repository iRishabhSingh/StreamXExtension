import React, { useState, useEffect } from "react";
import "./Overlay.css";

const PlayOverlay: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(true);

    const timeoutId = setTimeout(() => {
      setShouldAnimate(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [isPlaying]);

  return (
    <div
      className={`flex h-[80px] w-[80px] items-center justify-center rounded-full bg-white bg-opacity-20 opacity-0 ${
        shouldAnimate ? "animate-grow-and-fade" : "hidden"
      }`}
    >
      <img src="/streamx.png" alt="Play" width={80} height={80} />
    </div>
  );
};

export default PlayOverlay;
