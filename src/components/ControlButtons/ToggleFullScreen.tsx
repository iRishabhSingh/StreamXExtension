import { Button } from "../ui/button";
import { Maximize, Minimize } from "lucide-react";
import React, { useState, useEffect } from "react";

const ToggleFullScreen: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "f") {
        toggleFullScreen();
      } else if (event.key === "Escape" && isFullScreen) {
        exitFullScreen();
      }
    };

    const handleClick = (event: MouseEvent): void => {
      if (
        !event.target ||
        (event.target instanceof HTMLElement &&
          !event.target.closest(".toggle-play"))
      ) {
        toggleFullScreen();
      }
    };

    document.addEventListener("keypress", handleKeyDown);
    document.addEventListener("dblclick", handleClick);

    return () => {
      document.removeEventListener("keypress", handleKeyDown);
      document.removeEventListener("dblclick", handleClick);
    };
  });

  const toggleFullScreen = () => {
    const container = document.getElementById("media") as HTMLElement;
    if (!container) return;

    if (!isFullScreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      exitFullScreen();
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, [isFullScreen, setIsFullScreen]);

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleFullScreen}
      className="toggle-fullscreen hover:bg-transparent"
      title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
      aria-label={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
    >
      {isFullScreen ? (
        <Minimize width={20} height={20} />
      ) : (
        <Maximize width={20} height={20} />
      )}
    </Button>
  );
};

export default ToggleFullScreen;
