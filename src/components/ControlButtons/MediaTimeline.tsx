import { MediaProps } from "@/App";
import React, { useState, useEffect, useRef } from "react";
import { Progress } from "../ui/progress";

interface MediaTimelineProps {
  media: MediaProps;
  mediaRef: React.RefObject<HTMLMediaElement>;
  setRewinded: React.Dispatch<React.SetStateAction<boolean>>;
  setForwarded: React.Dispatch<React.SetStateAction<boolean>>;
}

const MediaTimeline: React.FC<MediaTimelineProps> = ({
  media,
  mediaRef,
  setRewinded,
  setForwarded,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = mediaRef.current;
    if (!current) return;

    type KeyEvent =
      | "j"
      | "l"
      | "ArrowLeft"
      | "ArrowRight"
      | "0"
      | "1"
      | "2"
      | "3"
      | "4"
      | "5"
      | "6"
      | "7"
      | "8"
      | "9";

    const handleKeyPress = (event: KeyboardEvent) => {
      const keyMap: Record<KeyEvent, number> = {
        j: -10,
        l: 10,
        ArrowLeft: -5,
        ArrowRight: 5,
        "0": 0 - current.currentTime,
        "1": duration * 0.1 - current.currentTime,
        "2": duration * 0.2 - current.currentTime,
        "3": duration * 0.3 - current.currentTime,
        "4": duration * 0.4 - current.currentTime,
        "5": duration * 0.5 - current.currentTime,
        "6": duration * 0.6 - current.currentTime,
        "7": duration * 0.7 - current.currentTime,
        "8": duration * 0.8 - current.currentTime,
        "9": duration * 0.9 - current.currentTime,
      };

      const timeAdjustment = keyMap[event.key as KeyEvent];
      if (timeAdjustment !== undefined) {
        current.currentTime += timeAdjustment;
        if (timeAdjustment === -5 || timeAdjustment === -10) {
          setRewinded(true);
          setTimeout(() => setRewinded(false), 1000);
        }

        if (timeAdjustment === 5 || timeAdjustment === 10) {
          setForwarded(true);
          setTimeout(() => setForwarded(false), 1000);
        }
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
  }, [duration, mediaRef, media, setRewinded, setForwarded]);

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
    <div className="relative z-10 flex h-2 items-center">
      <Progress
        ref={progressRef}
        value={progress}
        onClick={handleTimelineClick}
        className="h-1 w-full cursor-pointer rounded bg-[#71717A80] transition-all duration-200 hover:h-1.5"
      />
      <div
        className="absolute top-1/2 -mt-2 h-4 w-4 cursor-pointer rounded-full bg-white"
        style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
      ></div>
    </div>
  );
};

export default MediaTimeline;
