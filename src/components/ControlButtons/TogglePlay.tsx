import { Button } from "../ui/button";
import { Pause, Play } from "lucide-react";
import React, { useEffect } from "react";

interface TogglePlayProps {
  mediaRef: React.RefObject<HTMLMediaElement>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const TogglePlay: React.FC<TogglePlayProps> = ({
  mediaRef,
  isPlaying,
  setIsPlaying,
}) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key === " " || event.key.toLowerCase() === "k") {
        event.preventDefault();
        togglePlay();
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const handleClick = (): void => togglePlay();
    media.addEventListener("click", handleClick);

    return () => {
      media.removeEventListener("click", handleClick);
    };
  });

  const togglePlay = (): void => {
    const media = mediaRef.current;
    if (media) {
      if (media.paused) {
        media.play();
        setIsPlaying(true);
      } else {
        media.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={togglePlay}
      title={isPlaying ? "Pause" : "Play"}
      aria-label={isPlaying ? "Pause" : "Play"}
      className="toggle-play hover:bg-transparent"
    >
      {isPlaying ? (
        <Pause width={20} height={20} />
      ) : (
        <Play width={20} height={20} />
      )}
    </Button>
  );
};

export default TogglePlay;
