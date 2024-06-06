import React, { useState } from "react";
import "./App.css";
import Footer from "./components/ControlButtons/Footer";
import MediaInput from "./components/MediaInput/MediaInput";
import DragAndDrop from "./components/DragAndDrop/DragAndDrop";
import MediaPlayer from "./components/MediaPlayer/MediaPlayer";

export interface MediaProps {
  mediaName: string;
  mediaUrl: string;
  mediaType: string;
}

const App: React.FC = () => {
  const [playlist, setPlaylist] = useState<MediaProps[]>([]);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);

  const playNextMedia = () => {
    if (!autoPlay) return;
    setCurrentMediaIndex((prevIndex) =>
      prevIndex < playlist.length - 1 ? prevIndex + 1 : 0,
    );
  };

  const handleFilesDrop = (files: File[]) => {
    const newPlaylistItems: MediaProps[] = files.map((file) => ({
      mediaUrl: URL.createObjectURL(file),
      mediaName: file.name,
      mediaType: file.type,
    }));

    setPlaylist((prevPlaylist) => [...prevPlaylist, ...newPlaylistItems]);
  };

  return (
    <DragAndDrop onFilesDrop={handleFilesDrop}>
      <div className="container relative" id="media">
        {!playlist.length && (
          <>
            <div className="no-media-container">
              <h1>Select or drag and drop to start playback.</h1>
              <MediaInput
                playlist={playlist}
                setPlaylist={setPlaylist}
                currentMediaIndex={currentMediaIndex}
                setCurrentMediaIndex={setCurrentMediaIndex}
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
              setPlaylist={setPlaylist}
              media={playlist[currentMediaIndex]}
              currentMediaIndex={currentMediaIndex}
              setCurrentMediaIndex={setCurrentMediaIndex}
            />
          </div>
        )}
      </div>
    </DragAndDrop>
  );
};

export default App;
