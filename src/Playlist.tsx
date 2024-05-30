import React from "react";
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

const Playlist: React.FC<PlaylistProps> = ({
  mediaFiles,
  currentMediaIndex,
  setCurrentMediaIndex,
}) => {
  if (mediaFiles.length === 1) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="hover:bg-transparent">
          <ListVideo width={24} height={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Playlist</SheetTitle>
        </SheetHeader>
        {mediaFiles.map((media, index) => (
          <SheetHeader key={media.mediaName} className="m-2">
            <Button
              onClick={() => setCurrentMediaIndex(index)}
              className="px-2 justify-start hover:bg-[#80808030]"
              variant={`${index === currentMediaIndex ? "secondary" : "link"}`}
            >
              <span className="mr-2">
                {index === currentMediaIndex ? (
                  <Play width={15} height={15} />
                ) : media.mediaType === "audio" ? (
                  <Music width={15} height={15} />
                ) : (
                  <Clapperboard width={15} height={15} />
                )}
              </span>
              {media.mediaName}
            </Button>
          </SheetHeader>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default Playlist;
