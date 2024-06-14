import React, { useEffect, useRef, useState } from "react";
import Playlist from "@/Playlist";
import { MediaProps } from "@/App";
import Speaker from "./ControlButtons/Speaker";
import PlayNext from "./ControlButtons/PlayNext";
import PlayPrev from "./ControlButtons/PlayPrev";
import MediaInput from "./MediaInput/MediaInput";
import TogglePlay from "./ControlButtons/TogglePlay";
import MuteOverlay from "./ControlButtons/MuteOverlay";
import PlayOverlay from "./ControlButtons/PlayOverlay";
import PauseOverlay from "./ControlButtons/PauseOverlay";
import PlaybackTime from "./ControlButtons/PlaybackTime";
import MediaTimeline from "./ControlButtons/MediaTimeline";
import SettingsButton from "./ControlButtons/SettingsButton";
import ToggleAutoPlay from "./ControlButtons/ToggleAutoPlay";
import MediaController from "./MediaController/MediaController";
import LowVolumeOverlay from "./ControlButtons/LowVolumeOverlay";
import ToggleFullScreen from "./ControlButtons/ToggleFullScreen";
import HighVolumeOverlay from "./ControlButtons/HighVolumeOverlay";
import PictureInPictureButton from "./ControlButtons/PictureInPictureButton";
import ForwardOverlay from "./ControlButtons/ForwardOverlay";
import RewindOverlay from "./ControlButtons/RewindOverlay";

interface ControllerProps {
  media: MediaProps;
  autoPlay: boolean;
  playlist: MediaProps[];
  currentMediaIndex: number;
  mediaRef: React.RefObject<HTMLMediaElement>;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaylist: React.Dispatch<React.SetStateAction<MediaProps[]>>;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Controller = ({
  media,
  mediaRef,
  playlist,
  autoPlay,
  setAutoPlay,
  setPlaylist,
  currentMediaIndex,
  setCurrentMediaIndex,
}: ControllerProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [rewinded, setRewinded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [forwarded, setForwarded] = useState(false);
  const [isVolumeIncreased, setIsVolumeIncreased] = useState(false);
  const [isVolumeDecreased, setIsVolumeDecreased] = useState(false);
  const [showVolumeOverlay, setShowVolumeOverlay] = useState<boolean>(false);

  return (
    <>
      <Overlays
        isMuted={isMuted}
        mediaRef={mediaRef}
        rewinded={rewinded}
        isPlaying={isPlaying}
        forwarded={forwarded}
        isVolumeIncreased={isVolumeIncreased}
        isVolumeDecreased={isVolumeDecreased}
        showVolumeOverlay={showVolumeOverlay}
      />
      <MediaController mediaRef={mediaRef}>
        <TopControls
          playlist={playlist}
          currentMediaIndex={currentMediaIndex}
          setCurrentMediaIndex={setCurrentMediaIndex}
        />
        <BottomControls
          media={media}
          isMuted={isMuted}
          mediaRef={mediaRef}
          playlist={playlist}
          autoPlay={autoPlay}
          rewinded={rewinded}
          forwarded={forwarded}
          isPlaying={isPlaying}
          isHovered={isHovered}
          setIsMuted={setIsMuted}
          setAutoPlay={setAutoPlay}
          setPlaylist={setPlaylist}
          setRewinded={setRewinded}
          setForwarded={setForwarded}
          setIsPlaying={setIsPlaying}
          setIsHovered={setIsHovered}
          currentMediaIndex={currentMediaIndex}
          isVolumeIncreased={isVolumeIncreased}
          isVolumeDecreased={isVolumeDecreased}
          setCurrentMediaIndex={setCurrentMediaIndex}
          setIsVolumeIncreased={setIsVolumeIncreased}
          setIsVolumeDecreased={setIsVolumeDecreased}
          setShowVolumeOverlay={setShowVolumeOverlay}
        />
      </MediaController>
    </>
  );
};

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

interface TopControlProps {
  playlist: MediaProps[];
  currentMediaIndex: number;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
}

const TopControls: React.FC<TopControlProps> = ({
  playlist,
  currentMediaIndex,
  setCurrentMediaIndex,
}) => (
  <div className="absolute left-0 top-0 flex items-center gap-2 px-8 py-4 text-lg">
    <Playlist
      mediaFiles={playlist}
      currentMediaIndex={currentMediaIndex}
      setCurrentMediaIndex={setCurrentMediaIndex}
    />
    <span className="text-xl">{playlist[currentMediaIndex].mediaName}</span>
  </div>
);

interface BottomControlProps {
  isMuted: boolean;
  media: MediaProps;
  autoPlay: boolean;
  rewinded: boolean;
  forwarded: boolean;
  isHovered: boolean;
  isPlaying: boolean;
  playlist: MediaProps[];
  currentMediaIndex: number;
  isVolumeIncreased: boolean;
  isVolumeDecreased: boolean;
  mediaRef: React.RefObject<HTMLMediaElement>;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setRewinded: React.Dispatch<React.SetStateAction<boolean>>;
  setForwarded: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaylist: React.Dispatch<React.SetStateAction<MediaProps[]>>;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsVolumeIncreased: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVolumeDecreased: React.Dispatch<React.SetStateAction<boolean>>;
  setShowVolumeOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomControls: React.FC<BottomControlProps> = ({
  media,
  mediaRef,
  playlist,
  autoPlay,
  isPlaying,
  isHovered,
  setIsMuted,
  setAutoPlay,
  setRewinded,
  setPlaylist,
  setForwarded,
  setIsPlaying,
  setIsHovered,
  currentMediaIndex,
  setCurrentMediaIndex,
  setIsVolumeIncreased,
  setIsVolumeDecreased,
  setShowVolumeOverlay,
}) => (
  <div className="absolute bottom-0 left-0 right-0 z-10 mb-4 flex flex-col gap-2 px-8">
    <MediaTimeline
      media={media}
      mediaRef={mediaRef}
      setRewinded={setRewinded}
      setForwarded={setForwarded}
    />
    <div className="flex justify-between">
      <div className="flex gap-2" onMouseLeave={() => setIsHovered(false)}>
        <PlayPrev
          currentMediaIndex={currentMediaIndex}
          setCurrentMediaIndex={setCurrentMediaIndex}
        />
        <TogglePlay
          mediaRef={mediaRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <PlayNext
          playlist={playlist}
          currentMediaIndex={currentMediaIndex}
          setCurrentMediaIndex={setCurrentMediaIndex}
        />
        <Speaker
          mediaRef={mediaRef}
          setMuted={setIsMuted}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          setVolumeIncreased={setIsVolumeIncreased}
          setVolumeDecreased={setIsVolumeDecreased}
          setShowVolumeOverlay={setShowVolumeOverlay}
        />
        <PlaybackTime mediaRef={mediaRef} />
      </div>
      <div className="flex gap-2">
        <MediaInput
          playlist={playlist}
          setPlaylist={setPlaylist}
          currentMediaIndex={currentMediaIndex}
          setCurrentMediaIndex={setCurrentMediaIndex}
        />
        {playlist.length > 1 && (
          <ToggleAutoPlay autoPlay={autoPlay} setAutoPlay={setAutoPlay} />
        )}
        <SettingsButton mediaRef={mediaRef} />
        <PictureInPictureButton mediaRef={mediaRef} media={media} />
        <ToggleFullScreen />
      </div>
    </div>
  </div>
);

export default Controller;
