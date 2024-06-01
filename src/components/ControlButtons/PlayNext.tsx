import React, { useEffect } from "react";
import { SkipForward } from "lucide-react";
import { Button } from "../ui/button";
import { MediaProps } from "@/App";

interface PlayNextProps {
  playlist: MediaProps[];
  currentMediaIndex: number;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
}

const PlayNext: React.FC<PlayNextProps> = ({
  playlist,
  currentMediaIndex,
  setCurrentMediaIndex,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key.toLowerCase() === "n") {
        event.preventDefault();
        playNextMedia();
      }
    };

    document.addEventListener("keypress", handleKeyDown);
    return () => {
      document.removeEventListener("keypress", handleKeyDown);
    };
  });

  const playNextMedia = () => {
    if (currentMediaIndex < playlist.length - 1)
      setCurrentMediaIndex((prevIndex) => prevIndex + 1);
  };

  if (currentMediaIndex === playlist.length - 1) return null;

  return (
    <Button
      size="icon"
      variant="ghost"
      title="Play Next"
      aria-label="Play Next"
      onClick={playNextMedia}
      className="hover:bg-transparent"
    >
      <SkipForward width={20} height={20} />
    </Button>
  );
};

export default PlayNext;
