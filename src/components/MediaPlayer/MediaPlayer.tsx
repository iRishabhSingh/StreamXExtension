import React, { useEffect, useRef } from "react";
import Controller from "../Controller";
import { MediaProps } from "@/App";

export interface MediaPlayerProps {
  media: {
    mediaName: string;
    mediaUrl: string;
    mediaType: string;
  };
  autoPlay: boolean;
  onEnded: () => void;
  playlist: MediaProps[];
  currentMediaIndex: number;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaylist: React.Dispatch<React.SetStateAction<MediaProps[]>>;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({
  media,
  onEnded,
  autoPlay,
  playlist,
  setAutoPlay,
  setPlaylist,
  currentMediaIndex,
  setCurrentMediaIndex,
}) => {
  const { mediaUrl, mediaType } = media;
  const mediaRef = useRef<HTMLMediaElement>(null);

  useEffect(() => {
    if (mediaRef.current && autoPlay) {
      mediaRef.current.play();
    }
  }, [autoPlay, mediaRef]);

  return (
    <div className="media-container paused">
      <Controller
        media={media}
        mediaRef={mediaRef}
        autoPlay={autoPlay}
        playlist={playlist}
        setAutoPlay={setAutoPlay}
        setPlaylist={setPlaylist}
        currentMediaIndex={currentMediaIndex}
        setCurrentMediaIndex={setCurrentMediaIndex}
      />
      <div
        id="player"
        className="flex h-screen w-screen items-center justify-center"
      >
        {mediaType === "audio" ? (
          <audio
            key={mediaUrl}
            autoPlay={true}
            onEnded={onEnded}
            className="max-h-screen"
            ref={mediaRef as React.RefObject<HTMLAudioElement>}
          >
            <source src={mediaUrl} type="audio/mp3" />
            <track kind="captions" srcLang="en" label="English" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <video
            key={mediaUrl}
            autoPlay={true}
            onEnded={onEnded}
            className="max-h-screen"
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
          >
            <source src={mediaUrl} type="video/mp4" />
            <track kind="captions" srcLang="en" label="English" />
            Your browser does not support the video element.
          </video>
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;
