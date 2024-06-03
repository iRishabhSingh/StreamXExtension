import React, { useMemo } from "react";
import { MediaProps } from "./App";
import { Button } from "./components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Clapperboard, ListVideo, Music, Play } from "lucide-react";

interface PlaylistProps {
  mediaFiles: MediaProps[];
  currentMediaIndex: number;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const MediaIcon = React.memo(({ mediaType }: { mediaType: string }) => {
  const icon = useMemo(() => {
    switch (mediaType) {
      case "audio":
        return <Music width={15} height={15} />;
      case "video":
        return <Clapperboard width={15} height={15} />;
      default:
        return <Play width={15} height={15} />;
    }
  }, [mediaType]);

  return icon;
});

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
          className="hover:bg-transparent"
          aria-label="Open playlist"
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
            key={media.mediaName.concat(index.toString())}
            currentMediaIndex={currentMediaIndex}
            setCurrentMediaIndex={setCurrentMediaIndex}
          />
        ))}
      </SheetContent>
    </Sheet>
  );
};

interface PlaylistItemProps {
  media: MediaProps;
  index: number;
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
        className="justify-start px-2 hover:bg-[#80808030]"
        variant={`${index === currentMediaIndex ? "secondary" : "link"}`}
        aria-label={`${media.mediaType} ${media.mediaName}`}
      >
        <span className="mr-2">
          <MediaIcon mediaType={media.mediaType} />
        </span>
        {media.mediaName}
      </Button>
    </SheetHeader>
  );
};

export default Playlist;
