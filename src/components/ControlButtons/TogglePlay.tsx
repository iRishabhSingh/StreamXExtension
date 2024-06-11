import { Button } from "../ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";

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
  const [isEnded, setIsEnded] = useState(false);

  const playMedia = useCallback(
    (media: HTMLMediaElement): void => {
      media.play();
      setIsPlaying(true);
    },
    [setIsPlaying],
  );

  const pauseMedia = useCallback(
    (media: HTMLMediaElement): void => {
      media.pause();
      setIsPlaying(false);
    },
    [setIsPlaying],
  );

  const togglePlay = useCallback((): void => {
    const media = mediaRef.current;
    if (media) {
      if (media.paused) {
        playMedia(media);
      } else {
        pauseMedia(media);
      }
    }
  }, [mediaRef, playMedia, pauseMedia]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key === " " || event.key.toLowerCase() === "k") {
        event.preventDefault();
        togglePlay();
      }
    };

    const handleClick = (): void => togglePlay();

    const handleEnded = (): void => {
      setIsPlaying(false);
      setIsEnded(true);
    };

    const handlePlay = (): void => {
      setIsPlaying(true);
      setIsEnded(false);
    };

    const handlePause = (): void => {
      setIsPlaying(false);
    };

    const handleTimeUpdate = (): void => {
      const media = mediaRef.current;
      if (media && media.currentTime < media.duration) {
        setIsEnded(false);
      }
    };

    const media = mediaRef.current;
    if (media) {
      media.addEventListener("ended", handleEnded);
      media.addEventListener("play", handlePlay);
      media.addEventListener("pause", handlePause);
      media.addEventListener("timeupdate", handleTimeUpdate);
    }

    const doc = document.getElementById("player");
    if (!doc) return;

    doc.addEventListener("click", handleClick);
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      if (media) {
        media.removeEventListener("ended", handleEnded);
        media.removeEventListener("play", handlePlay);
        media.removeEventListener("pause", handlePause);
        media.removeEventListener("timeupdate", handleTimeUpdate);
      }
      doc.removeEventListener("click", handleClick);
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [togglePlay, mediaRef, setIsPlaying]);

  const renderIcon = () => {
    if (isEnded) {
      return <RotateCcw width={20} height={20} />;
    } else if (isPlaying) {
      return <Pause width={20} height={20} />;
    } else {
      return <Play width={20} height={20} />;
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={togglePlay}
      title={isPlaying ? "Pause" : "Play"}
      aria-label={isPlaying ? "Pause" : "Play"}
      className="toggle-play z-10 hover:bg-transparent"
    >
      {renderIcon()}
    </Button>
  );
};

export default TogglePlay;
