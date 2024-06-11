import React from "react";
import { Button } from "../ui/button";
import { PictureInPicture } from "lucide-react"; // Assuming you have an icon for PiP

interface PictureInPictureButtonProps {
  media: {
    mediaName: string;
    mediaUrl: string;
    mediaType: string;
  };
  mediaRef: React.RefObject<HTMLMediaElement>;
}

const PictureInPictureButton: React.FC<PictureInPictureButtonProps> = ({
  media,
  mediaRef,
}) => {
  if (media.mediaType === "audio") return null;

  const handlePictureInPicture = async () => {
    if (mediaRef.current && mediaRef.current instanceof HTMLVideoElement) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await mediaRef.current.requestPictureInPicture();
        }
      } catch (error) {
        console.error("Failed to enter Picture-in-Picture mode:", error);
      }
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handlePictureInPicture}
      className="z-10 hover:bg-transparent"
    >
      <PictureInPicture width={20} height={20} />
    </Button>
  );
};

export default PictureInPictureButton;
