import React, { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import MediaInput from "./components/MediaInput/MediaInput";
import MediaPlayer from "./components/MediaPlayer/MediaPlayer";
import Playlist from "./Playlist";

export interface MediaProps {
  mediaName: string;
  mediaUrl: string;
  mediaType: string;
}

const App: React.FC = () => {
  const [playlist, setPlaylist] = useState<MediaProps[]>([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);

  useEffect(() => {
    if (playlist.length > 0) {
      playMedia(currentMediaIndex);
    }
  }, [playlist, currentMediaIndex]);

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

  const playMedia = (index: number) => {
    setCurrentMediaIndex(index);
    // Play the selected media file
    // Your implementation for playing media goes here
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
          <div className="absolute top-0 left-0 px-8 py-4 text-lg flex items-center">
            <Playlist
              mediaFiles={playlist}
              currentMediaIndex={currentMediaIndex}
              setCurrentMediaIndex={setCurrentMediaIndex}
            />
            <span>{playlist[currentMediaIndex].mediaName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
