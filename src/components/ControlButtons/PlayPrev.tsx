import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { SkipBack } from "lucide-react";

interface PlayPrevProps {
  currentMediaIndex: number;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
}

const PlayPrev: React.FC<PlayPrevProps> = ({
  currentMediaIndex,
  setCurrentMediaIndex,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
        playPrevMedia();
      }
    };

    document.addEventListener("keypress", handleKeyDown);
    return () => {
      document.removeEventListener("keypress", handleKeyDown);
    };
  });

  const playPrevMedia = () => {
    if (currentMediaIndex > 0)
      setCurrentMediaIndex((prevIndex) => prevIndex - 1);
  };

  if (currentMediaIndex === 0) return null;

  return (
    <Button
      size="icon"
      variant="ghost"
      title="Play Previous"
      onClick={playPrevMedia}
      aria-label="Play Previous"
      className="z-10 hover:bg-transparent"
    >
      <SkipBack width={20} height={20} />
    </Button>
  );
};

export default PlayPrev;
