import React from "react";

interface MediaPlayerProps {
  media: {
    mediaName: string;
    mediaUrl: string;
    mediaType: string;
  };
  onEnded: () => void;
  autoPlay: boolean;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({
  media,
  onEnded,
  autoPlay,
}) => {
  const { mediaUrl, mediaType } = media;

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {mediaType === "audio" ? (
        <audio
          controls
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
          controls
          onEnded={onEnded}
          autoPlay={autoPlay}
          className="max-h-screen max-w-screen"
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
