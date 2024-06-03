import React, { useState, useEffect, useRef } from "react";

interface MediaTimelineProps {
  media: {
    mediaName: string;
    mediaUrl: string;
    mediaType: string;
  };
  mediaRef: React.RefObject<HTMLMediaElement>;
}

const MediaTimeline: React.FC<MediaTimelineProps> = ({ media, mediaRef }) => {
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = mediaRef.current;
    if (!current) return;

    type KeyEvent = "j" | "l" | "ArrowLeft" | "ArrowRight";

    const handleKeyPress = (event: KeyboardEvent) => {
      const keyMap: Record<KeyEvent, number> = {
        j: -10,
        l: 10,
        ArrowLeft: -5,
        ArrowRight: 5,
      };

      const timeAdjustment = keyMap[event.key as KeyEvent];
      if (timeAdjustment !== undefined) {
        current.currentTime += timeAdjustment;
      }
    };

    const updateProgress = () => {
      const currentProgress = (current.currentTime / current.duration) * 100;
      setProgress(currentProgress);
    };

    const updateDuration = () => {
      setDuration(current.duration);
    };

    document.addEventListener("keypress", handleKeyPress);
    current.addEventListener("timeupdate", updateProgress);
    current.addEventListener("loadedmetadata", updateDuration);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
      current.removeEventListener("timeupdate", updateProgress);
      current.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [mediaRef, media]);

  const handleTimelineClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (mediaRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;

      mediaRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="flex h-2 items-center">
      <div
        ref={progressRef}
        onClick={handleTimelineClick}
        className="h-1 w-full cursor-pointer rounded bg-[#71717A80] transition-all duration-200 hover:h-1.5 hover:rounded-none"
      >
        <div
          style={{ width: `${progress}%` }}
          className="h-full rounded bg-white"
        ></div>
      </div>
    </div>
  );
};

export default MediaTimeline;
