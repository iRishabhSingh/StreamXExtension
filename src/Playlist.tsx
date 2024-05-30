import React, { useState, useEffect } from "react";
import { MediaProps } from "./App";
import { Button } from "./components/ui/button";

interface PlaylistProps {
  mediaFiles: MediaProps[];
}

const Playlist: React.FC<PlaylistProps> = ({ mediaFiles }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);

  useEffect(() => {
    // Automatically play the first media file when the component mounts
    if (mediaFiles.length > 0) {
      playMedia(0);
    }
  }, [mediaFiles]);

  const playMedia = (index: number) => {
    setCurrentMediaIndex(index);
    // Play the selected media file
    // Your implementation for playing media goes here
  };

  const playNextMedia = () => {
    if (currentMediaIndex < mediaFiles.length - 1) {
      playMedia(currentMediaIndex + 1);
    } else {
      // Loop back to the first media file if reached the end of the playlist
      playMedia(0);
    }
  };

  return (
    <div>
      <h2>Playlist</h2>
      <ul>
        {mediaFiles.map((media, index) => (
          <li key={media.mediaName}>
            <Button onClick={() => playMedia(index)}>{media.mediaName}</Button>
          </li>
        ))}
      </ul>
      <button onClick={playNextMedia}>Play Next</button>
    </div>
  );
};

export default Playlist;
