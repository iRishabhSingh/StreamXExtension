import React, { useState } from "react";
import Playlist from "@/Playlist";
import { MediaProps } from "@/App";
import Overlays from "@/components/Overlays";

import MediaInput from "./MediaInput/MediaInput";
import MediaController from "./MediaController/MediaController";

import Speaker from "./ControlButtons/Speaker";
import PlayNext from "./ControlButtons/PlayNext";
import PlayPrev from "./ControlButtons/PlayPrev";
import TogglePlay from "./ControlButtons/TogglePlay";
import PlaybackTime from "./ControlButtons/PlaybackTime";
import MediaTimeline from "./ControlButtons/MediaTimeline";
import SettingsButton from "./ControlButtons/SettingsButton";
import ToggleAutoPlay from "./ControlButtons/ToggleAutoPlay";
import ToggleFullScreen from "./ControlButtons/ToggleFullScreen";
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
