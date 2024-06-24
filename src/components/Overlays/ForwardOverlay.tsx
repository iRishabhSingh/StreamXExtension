import React, { useState, useEffect } from "react";
import { ChevronsRight } from "lucide-react";
import "./Overlay.css";

const ForwardOverlay: React.FC<{ forwarded: boolean }> = ({ forwarded }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(true);

    const timeoutId = setTimeout(() => {
      setShouldAnimate(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [forwarded]);

  return (
    <div
      className={`flex h-[80px] w-[80px] items-center justify-center rounded-full bg-white bg-opacity-20 opacity-0 ${
        shouldAnimate ? "animate-grow-and-fade" : "hidden"
      }`}
    >
      <ChevronsRight width={40} height={40} />
    </div>
  );
};

export default ForwardOverlay;
