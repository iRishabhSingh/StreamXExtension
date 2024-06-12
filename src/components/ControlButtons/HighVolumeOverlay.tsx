import React, { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import "./Overlay.css";

const HighVolumeOverlay: React.FC<{ volumeIncreased: boolean }> = ({
  volumeIncreased,
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(true);

    const timeoutId = setTimeout(() => {
      setShouldAnimate(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [volumeIncreased]);

  return (
    <div
      className={`flex h-[80px] w-[80px] items-center justify-center rounded-full bg-white bg-opacity-20 opacity-0 ${
        shouldAnimate ? "animate-grow-and-fade" : "hidden"
      }`}
    >
      <Volume2 width={40} height={40} />
    </div>
  );
};

export default HighVolumeOverlay;
