import React, { useEffect, useRef } from "react";
import Controller from "../Controller";
import { MediaProps } from "@/App";

interface MediaPlayerProps {
  media: {
    mediaName: string;
    mediaUrl: string;
    mediaType: string;
  };
  onEnded: () => void;
  autoPlay: boolean;
  playlist: MediaProps[];
  currentMediaIndex: number;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({
  media,
  onEnded,
  autoPlay,
  playlist,
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
    <div className="h-screen w-screen flex items-center justify-center media-container paused">
      <Controller
        mediaRef={mediaRef}
        playlist={playlist}
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
