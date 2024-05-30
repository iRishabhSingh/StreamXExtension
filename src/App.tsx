import React, { ChangeEvent, useState } from "react";
import "./App.css";
import MediaInput from "./components/MediaInput/MediaInput";
import MediaPlayer from "./components/MediaPlayer/MediaPlayer";

export interface MediaProps {
  mediaName: string;
  mediaUrl: string;
  mediaType: string;
}

const App: React.FC = () => {
  const [playlist, setPlaylist] = useState<MediaProps[]>([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);

  const handleMediaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newMediaList: MediaProps[] = [];

    for (const file of files) {
      const fileType = file.type.split("/")[0];
      if (fileType === "audio" || fileType === "video") {
        const mediaObjectURL = URL.createObjectURL(file);
        newMediaList.push({
          mediaType: fileType,
          mediaName: file.name,
          mediaUrl: mediaObjectURL,
        });
      } else {
        alert(`File '${file.name}' is not a valid audio or video file.`);
      }
    }

    if (newMediaList.length > 0) {
      setPlaylist(newMediaList);
      setCurrentMediaIndex(0); // Start playing the first media in the playlist
    }
  };

  const playNextMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex < playlist.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="media-container relative">
      {!playlist.length && (
        <div className="no-media-container">
          <h1>Select something to play.</h1>
          <MediaInput
            handleMediaChange={handleMediaChange}
            playlist={playlist}
          />
        </div>
      )}
      {playlist.length > 0 && (
        <div>
          <MediaPlayer
            onEnded={playNextMedia}
            autoPlay={currentMediaIndex === 0}
            media={playlist[currentMediaIndex]}
          />
          <p className="absolute top-0 left-0 px-8 py-4 text-lg">
            {playlist[currentMediaIndex].mediaName}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
