import React, { ReactNode, useEffect, useRef, useState } from "react";
import "./MediaController.css";

interface MediaControllerProps {
  children: ReactNode;
}

const MediaController: React.FC<MediaControllerProps> = ({ children }) => {
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimeout = useRef<NodeJS.Timeout>();

  const handleMouseInteraction = () => {
    setShowControls(true);
    clearTimeout(hideControlsTimeout.current!);
    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  const toggleControls = () => {
    setShowControls((prev) => !prev);
    clearTimeout(hideControlsTimeout.current!);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseInteraction);
    window.addEventListener("click", toggleControls);

    return () => {
      window.removeEventListener("mousemove", handleMouseInteraction);
      window.removeEventListener("click", toggleControls);
      clearTimeout(hideControlsTimeout.current!);
    };
  }, []);

  return (
    <div className={`controller ${showControls ? "" : "hide"}`}>{children}</div>
  );
};

export default MediaController;
