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

    const handleClick = (): void => togglePlay();

    const doc = document.getElementById("player");
    if (!doc) return;

    doc.addEventListener("click", handleClick);
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      doc.removeEventListener("click", handleClick);
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  const togglePlay = (): void => {
    const media = mediaRef.current;
    if (media) {
      if (media.paused) {
        playMedia(media);
      } else {
        pauseMedia(media);
      }
    }
  };

  const playMedia = (media: HTMLMediaElement): void => {
    media.play();
    setIsPlaying(true);
  };

  const pauseMedia = (media: HTMLMediaElement): void => {
    media.pause();
    setIsPlaying(false);
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
