import React, { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/ControlButtons/Footer";
import MediaInput from "./components/MediaInput/MediaInput";
import MediaPlayer from "./components/MediaPlayer/MediaPlayer";

export interface MediaProps {
  mediaName: string;
  mediaUrl: string;
  mediaType: string;
}

const App: React.FC = () => {
  const [playlist, setPlaylist] = useState<MediaProps[]>([]);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
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
        const name = removeFileType(file.name);
        newMediaList.push({
          mediaType: fileType,
          mediaName: name,
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

  function removeFileType(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex === -1) {
      return fileName;
    }
    return fileName.substring(0, lastDotIndex);
  }

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
    <div className="container relative" id="media">
      {!playlist.length && (
        <>
          <div className="no-media-container">
            <h1>Select something to play.</h1>
            <MediaInput
              handleMediaChange={handleMediaChange}
              playlist={playlist}
            />
          </div>
          <Footer />
        </>
      )}
      {playlist.length > 0 && (
        <div>
          <MediaPlayer
            autoPlay={autoPlay}
            playlist={playlist}
            onEnded={playNextMedia}
            setAutoPlay={setAutoPlay}
            media={playlist[currentMediaIndex]}
            currentMediaIndex={currentMediaIndex}
            setCurrentMediaIndex={setCurrentMediaIndex}
          />
        </div>
      )}
    </div>
  );
};

export default App;
