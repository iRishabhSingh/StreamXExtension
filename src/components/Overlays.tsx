import { useEffect, useRef, useState } from "react";
import MuteOverlay from "./Overlays/MuteOverlay";
import PlayOverlay from "./Overlays/PlayOverlay";
import PauseOverlay from "./Overlays/PauseOverlay";
import RewindOverlay from "./Overlays/RewindOverlay";
import ForwardOverlay from "./Overlays/ForwardOverlay";
import LowVolumeOverlay from "./Overlays/LowVolumeOverlay";
import HighVolumeOverlay from "./Overlays/HighVolumeOverlay";

interface OverlayProps {
  isMuted: boolean;
  rewinded: boolean;
  isPlaying: boolean;
  forwarded: boolean;
  isVolumeIncreased: boolean;
  isVolumeDecreased: boolean;
  showVolumeOverlay: boolean;
  mediaRef: React.RefObject<HTMLMediaElement>;
}

const Overlays = ({
  isMuted,
  mediaRef,
  rewinded,
  isPlaying,
  forwarded,
  isVolumeIncreased,
  isVolumeDecreased,
}: OverlayProps) => {
  const [volume, setVolume] = useState<number>(1.0);
  const mediaCallbackRef = useRef<HTMLMediaElement | null>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (media) {
      mediaCallbackRef.current = media;
      const handleVolumeChange = () => {
        setVolume(media.volume);
      };

      media.addEventListener("volumechange", handleVolumeChange);

      return () => {
        media.removeEventListener("volumechange", handleVolumeChange);
      };
    }
  }, [mediaRef]);

  useEffect(() => {
    if (
      mediaCallbackRef.current &&
      mediaCallbackRef.current.volume !== volume
    ) {
      setVolume(mediaCallbackRef.current.volume);
    }
    console.log(volume);
  }, [volume]);

  return (
    <>
      {(isVolumeIncreased || isVolumeDecreased || isMuted) && (
        <span className="absolute left-1/2 top-16 -translate-x-1/2 -translate-y-1/2 transform rounded bg-black bg-opacity-40 px-4 py-2 text-lg">
          {isMuted ? "0" : (volume * 100).toFixed(0)}%
        </span>
      )}
      {forwarded && (
        <div className="absolute left-2/3 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full text-white">
          <ForwardOverlay forwarded={forwarded} />
        </div>
      )}
      {rewinded && (
        <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full text-white">
          <RewindOverlay rewinded={rewinded} />
        </div>
      )}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full text-white">
        {isPlaying ? (
          <PlayOverlay isPlaying={isPlaying} />
        ) : (
          <PauseOverlay isPlaying={isPlaying} />
        )}
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full text-white">
        {isMuted && !isVolumeIncreased && !isVolumeDecreased && (
          <MuteOverlay muted={isMuted} />
        )}
        {isVolumeDecreased && !isVolumeIncreased && (
          <LowVolumeOverlay volumeDecreased={isVolumeDecreased} />
        )}
        {isVolumeIncreased && !isVolumeDecreased && (
          <HighVolumeOverlay volumeIncreased={isVolumeIncreased} />
        )}
      </div>
    </>
  );
};

export default Overlays;
