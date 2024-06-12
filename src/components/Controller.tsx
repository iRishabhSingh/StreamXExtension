import React, { useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVolumeIncreased, setIsVolumeIncreased] = useState(false);
  const [isVolumeDecreased, setIsVolumeDecreased] = useState(false);

  return (
    <>
      <Overlays
        isMuted={isMuted}
        isPlaying={isPlaying}
        isVolumeIncreased={isVolumeIncreased}
        isVolumeDecreased={isVolumeDecreased}
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
          isPlaying={isPlaying}
          isHovered={isHovered}
          setIsMuted={setIsMuted}
          setAutoPlay={setAutoPlay}
          setPlaylist={setPlaylist}
          setIsPlaying={setIsPlaying}
          setIsHovered={setIsHovered}
          currentMediaIndex={currentMediaIndex}
          isVolumeIncreased={isVolumeIncreased}
          isVolumeDecreased={isVolumeDecreased}
          setCurrentMediaIndex={setCurrentMediaIndex}
          setIsVolumeIncreased={setIsVolumeIncreased}
          setIsVolumeDecreased={setIsVolumeDecreased}
        />
      </MediaController>
    </>
  );
};

interface OverlayProps {
  isMuted: boolean;
  isPlaying: boolean;
  isVolumeIncreased: boolean;
  isVolumeDecreased: boolean;
}

const Overlays: React.FC<OverlayProps> = ({
  isMuted,
  isPlaying,
  isVolumeIncreased,
  isVolumeDecreased,
}) => (
  <>
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full text-white">
      {isPlaying ? (
        <PlayOverlay isPlaying={isPlaying} />
      ) : (
        <PauseOverlay isPlaying={isPlaying} />
      )}
    </div>
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full text-white">
      {isMuted && <MuteOverlay muted={isMuted} />}
      {isVolumeDecreased && !isVolumeIncreased && (
        <LowVolumeOverlay volumeDecreased={isVolumeDecreased} />
      )}
      {isVolumeIncreased && !isVolumeDecreased && (
        <HighVolumeOverlay volumeIncreased={isVolumeIncreased} />
      )}
    </div>
  </>
);

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
  isHovered: boolean;
  isPlaying: boolean;
  playlist: MediaProps[];
  currentMediaIndex: number;
  isVolumeIncreased: boolean;
  isVolumeDecreased: boolean;
  mediaRef: React.RefObject<HTMLMediaElement>;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaylist: React.Dispatch<React.SetStateAction<MediaProps[]>>;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsVolumeIncreased: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVolumeDecreased: React.Dispatch<React.SetStateAction<boolean>>;
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
  setPlaylist,
  setIsPlaying,
  setIsHovered,
  currentMediaIndex,
  setCurrentMediaIndex,
  setIsVolumeIncreased,
  setIsVolumeDecreased,
}) => (
  <div className="absolute bottom-0 left-0 right-0 mb-4 flex flex-col gap-2 px-8">
    <MediaTimeline media={media} mediaRef={mediaRef} />
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
