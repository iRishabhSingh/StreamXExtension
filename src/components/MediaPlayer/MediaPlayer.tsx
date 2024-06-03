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
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({
  media,
  onEnded,
  autoPlay,
  playlist,
  setAutoPlay,
  currentMediaIndex,
  setCurrentMediaIndex,
}) => {
  console.log(autoPlay);
  const { mediaUrl, mediaType } = media;
  const mediaRef = useRef<HTMLMediaElement>(null);

  useEffect(() => {
    if (mediaRef.current && autoPlay) {
      mediaRef.current.play();
    }
  }, [autoPlay, mediaRef]);

  return (
    <div className="media-container flex h-screen w-screen items-center justify-center paused">
      <Controller
        media={media}
        mediaRef={mediaRef}
        autoPlay={autoPlay}
        playlist={playlist}
        setAutoPlay={setAutoPlay}
        currentMediaIndex={currentMediaIndex}
        setCurrentMediaIndex={setCurrentMediaIndex}
      />
      {mediaType === "audio" ? (
        <audio
          ref={mediaRef as React.RefObject<HTMLAudioElement>}
          onEnded={onEnded}
          autoPlay={autoPlay}
          className="max-h-screen"
        >
          <source src={mediaUrl} type="audio/mp3" />
          <track kind="captions" srcLang="en" label="English" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          onEnded={onEnded}
          autoPlay={autoPlay}
          className="max-h-screen"
        >
          <source src={mediaUrl} type="video/mp4" />
          <track kind="captions" srcLang="en" label="English" />
          Your browser does not support the video element.
        </video>
      )}
    </div>
  );
};

export default MediaPlayer;
