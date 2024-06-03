import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";

interface PlaybackTimeProps {
  mediaRef: React.RefObject<HTMLMediaElement>;
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const PlaybackTime: React.FC<PlaybackTimeProps> = ({ mediaRef }) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showRemaining, setShowRemaining] = useState<boolean>(false);

  useEffect(() => {
    const media = mediaRef.current;

    const updateCurrentTime = () => {
      if (media) setCurrentTime(media.currentTime);
    };

    const updateDuration = () => {
      if (media) setDuration(media.duration);
    };

    if (media) {
      media.addEventListener("timeupdate", updateCurrentTime);
      media.addEventListener("loadedmetadata", updateDuration);
    }

    return () => {
      if (media) {
        media.removeEventListener("timeupdate", updateCurrentTime);
        media.removeEventListener("loadedmetadata", updateDuration);
      }
    };
  });

  const toggleTimeDisplay = () => {
    setShowRemaining((prevShowRemaining) => !prevShowRemaining);
  };

  const remainingTime = duration - currentTime;

  return (
    <div className="playback-time mx-2 flex items-center justify-center">
      <Button
        variant="ghost"
        className="p-0 text-sm hover:bg-transparent"
        onClick={toggleTimeDisplay}
      >
        {showRemaining
          ? `-${formatTime(remainingTime)}`
          : formatTime(currentTime)}{" "}
        / {formatTime(duration)}
      </Button>
    </div>
  );
};

export default PlaybackTime;
