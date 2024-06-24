import React, { useState, useEffect } from "react";
import { Volume1 } from "lucide-react";
import "./Overlay.css";

const LowVolumeOverlay: React.FC<{ volumeDecreased: boolean }> = ({
  volumeDecreased,
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(true);

    const timeoutId = setTimeout(() => {
      setShouldAnimate(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [volumeDecreased]);

  return (
    <div
      className={`flex h-[80px] w-[80px] items-center justify-center rounded-full bg-white bg-opacity-20 opacity-0 ${
        shouldAnimate ? "animate-grow-and-fade" : "hidden"
      }`}
    >
      <Volume1 width={40} height={40} />
    </div>
  );
};

export default LowVolumeOverlay;
