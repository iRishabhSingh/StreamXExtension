import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Volume1, Volume2, VolumeX } from "lucide-react";

interface SpeakerProps {
  mediaRef: React.RefObject<HTMLMediaElement>;
}

const Speaker: React.FC<SpeakerProps> = ({ mediaRef }) => {
  const [volume, setVolume] = useState<number>(1.0); // Initial volume between 0 and 1
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "m") {
        event.preventDefault();
        toggleMute();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        increaseVolumeByFive();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        decreaseVolumeByFive();
      }
    };

    document.addEventListener("keypress", handleKeyDown);
    return () => {
      document.removeEventListener("keypress", handleKeyDown);
    };
  });

  const toggleMute = () => {
    if (mediaRef.current) {
      const newMutedState = !isMuted;
      mediaRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const increaseVolumeByFive = (): void => {
    const media = mediaRef.current;
    if (media) {
      const newVolume = Math.min(volume + 0.05, 1); // Ensure volume does not exceed 1
      media.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const decreaseVolumeByFive = () => {
    const media = mediaRef.current;
    if (media) {
      const newVolume = Math.max(volume - 0.05, 0); // Ensure volume does not go below 0
      media.volume = newVolume;
      setVolume(newVolume);
    }
  };

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
        className="hover:bg-transparent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {getVolumeIcon()}
      </Button>
      {isHovered && (
        <div className="w-16 flex items-center justify-center">
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
            onMouseLeave={() => setIsHovered(false)}
            className="w-full h-[4px] rounded-full outline-none cursor-pointer bg-gray-200"
          />
        </div>
      )}
    </>
  );
};

export default Speaker;