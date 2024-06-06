import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./MediaController.css";

interface MediaControllerProps {
  children: ReactNode;
  mediaRef: React.RefObject<HTMLMediaElement>;
}

const MediaController: React.FC<MediaControllerProps> = ({
  children,
  mediaRef,
}) => {
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimeout = useRef<NodeJS.Timeout>();

  const handleMouseInteraction = useCallback(() => {
    setShowControls(true);
    if (mediaRef.current && mediaRef.current.paused) return;

    clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  }, [mediaRef]);

  useEffect(() => {
    window.addEventListener("keypress", handleMouseInteraction);
    window.addEventListener("mousemove", handleMouseInteraction);
    window.addEventListener("click", handleMouseInteraction);

    return () => {
      window.removeEventListener("keypress", handleMouseInteraction);
      window.removeEventListener("mousemove", handleMouseInteraction);
      window.removeEventListener("click", handleMouseInteraction);
      clearTimeout(hideControlsTimeout.current);
    };
  }, [handleMouseInteraction]);

  return (
    <div className={`controller ${showControls ? "" : "hide"}`}>{children}</div>
  );
};

export default MediaController;
