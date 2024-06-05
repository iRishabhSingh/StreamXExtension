import React from "react";
import { Clapperboard, ListVideo, Music, Play } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MediaProps } from "./App";
import { Button } from "./components/ui/button";

interface PlaylistProps {
  mediaFiles: MediaProps[];
  currentMediaIndex: number;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const MediaIcon: React.FC<{
  index: number;
  mediaType: string;
  currentMediaIndex: number;
}> = ({ index, mediaType, currentMediaIndex }) => {
  if (index === currentMediaIndex) {
    return <Play width={15} height={15} />;
  } else if (mediaType === "video") {
    return <Clapperboard width={15} height={15} />;
  }
  return <Music width={15} height={15} />;
};

interface PlaylistItemProps {
  index: number;
  media: MediaProps;
  currentMediaIndex: number;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  media,
  index,
  currentMediaIndex,
  setCurrentMediaIndex,
}) => {
  const handleClick = () => {
    setCurrentMediaIndex(index);
  };

  return (
    <SheetHeader className="m-2">
      <Button
        onClick={handleClick}
        className="justify-start overflow-hidden"
        aria-label={`${media.mediaType}-${media.mediaName}`}
        variant={`${index === currentMediaIndex ? "secondary" : "ghost"}`}
      >
        <span className="mr-2">
          <MediaIcon
            index={index}
            mediaType={media.mediaType}
            currentMediaIndex={currentMediaIndex}
          />
        </span>
        <span className="mr-2 w-full overflow-auto text-start">
          {media.mediaName}
        </span>
      </Button>
    </SheetHeader>
  );
};

const Playlist: React.FC<PlaylistProps> = ({
  mediaFiles,
  currentMediaIndex,
  setCurrentMediaIndex,
}) => {
  if (mediaFiles.length <= 1) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Open playlist"
          className="hover:bg-transparent"
        >
          <ListVideo width={24} height={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Playlist</SheetTitle>
        </SheetHeader>
        {mediaFiles.map((media, index) => (
          <PlaylistItem
            media={media}
            index={index}
            key={`${media.mediaName}_${index}`}
            currentMediaIndex={currentMediaIndex}
            setCurrentMediaIndex={setCurrentMediaIndex}
          />
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default Playlist;
