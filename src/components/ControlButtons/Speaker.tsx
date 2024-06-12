import React, { useEffect, useState, useCallback } from "react";
import { Button } from "../ui/button";
import { Volume1, Volume2, VolumeX } from "lucide-react";

interface SpeakerProps {
  isHovered: boolean;
  mediaRef: React.RefObject<HTMLMediaElement>;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  setVolumeIncreased: React.Dispatch<React.SetStateAction<boolean>>;
  setVolumeDecreased: React.Dispatch<React.SetStateAction<boolean>>;
}

const Speaker: React.FC<SpeakerProps> = ({
  mediaRef,
  setMuted,
  isHovered,
  setIsHovered,
  setVolumeDecreased,
  setVolumeIncreased,
}) => {
  const [volume, setVolume] = useState<number>(1.0); // Initial volume between 0 and 1
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const toggleMute = useCallback(() => {
    if (mediaRef.current) {
      const newMutedState = !isMuted;
      mediaRef.current.muted = newMutedState;
      setMuted(newMutedState);
      setTimeout(() => setMuted(false), 1500);
      setIsMuted(newMutedState);
      setVolumeIncreased(!newMutedState);
    }
  }, [isMuted, mediaRef, setMuted, setVolumeIncreased]);

  const increaseVolume = useCallback(() => {
    const media = mediaRef.current;
    if (media) {
      const newVolume = Math.min(volume + 0.05, 1); // Ensure volume does not exceed 1
      media.volume = newVolume;
      setVolume(newVolume);
      if (newVolume > 0 && !isMuted) setMuted(false);
      setVolumeDecreased(false);
      setVolumeIncreased(true);
      setTimeout(() => setVolumeIncreased(false), 1500);
    }
  }, [
    volume,
    isMuted,
    mediaRef,
    setMuted,
    setVolume,
    setVolumeDecreased,
    setVolumeIncreased,
  ]);

  const decreaseVolume = useCallback(() => {
    const media = mediaRef.current;
    if (media) {
      const newVolume = Math.max(volume - 0.05, 0); // Ensure volume does not go below 0
      media.volume = newVolume;
      setVolume(newVolume);
      setVolumeIncreased(false);
      if (newVolume === 0) {
        setMuted(true);
        setTimeout(() => setMuted(false), 1500);
        setVolumeDecreased(false);
      } else {
        setVolumeDecreased(true);
        setTimeout(() => setVolumeDecreased(false), 1500);
      }
    }
  }, [
    volume,
    mediaRef,
    setMuted,
    setVolume,
    setVolumeDecreased,
    setVolumeIncreased,
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "m") {
        event.preventDefault();
        toggleMute();
      } else if (event.key === "w") {
        event.preventDefault();
        increaseVolume();
      } else if (event.key === "s") {
        event.preventDefault();
        decreaseVolume();
      }
    };

    document.addEventListener("keypress", handleKeyDown);
    return () => {
      document.removeEventListener("keypress", handleKeyDown);
    };
  }, [isMuted, volume, toggleMute, increaseVolume, decreaseVolume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (mediaRef.current) {
      mediaRef.current.volume = newVolume;
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX width={20} height={20} />;
    } else if (volume > 0.5) {
      return <Volume2 width={20} height={20} />;
    } else {
      return <Volume1 width={20} height={20} />;
    }
  };

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        onClick={toggleMute}
        className="z-10 hover:bg-transparent"
        onMouseEnter={() => setIsHovered(true)}
      >
        {getVolumeIcon()}
      </Button>
      {isHovered && (
        <div className="flex w-16 items-center justify-center">
          <input
            min={0}
            max={1}
            step={0.01}
            type="range"
            title="Volume"
            value={volume}
            aria-label="Volume Control"
            onChange={handleVolumeChange}
            onMouseEnter={() => setIsHovered(true)}
            className="h-[4px] w-full cursor-pointer rounded-full bg-gray-200 outline-none"
          />
        </div>
      )}
    </>
  );
};

export default Speaker;
