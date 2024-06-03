import React, { ChangeEvent, useEffect } from "react";
import {
  CircleX,
  Clapperboard,
  FolderOpen,
  ListPlus,
  Music,
  Play,
} from "lucide-react";
import "./MediaInput.css";
import { MediaProps } from "@/App";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface MediaInputProps {
  playlist: MediaProps[];
  currentMediaIndex: number;
  setPlaylist: React.Dispatch<React.SetStateAction<MediaProps[]>>;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
}

const MediaInput: React.FC<MediaInputProps> = ({
  playlist,
  setPlaylist,
  currentMediaIndex,
  setCurrentMediaIndex,
}) => {
  useEffect(() => {
    if (playlist.length > 0) {
      playMedia(currentMediaIndex);
    }
  });

  const handleMediaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newMediaList: MediaProps[] = [...playlist];

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
      }
    }

    if (newMediaList.length > playlist.length) {
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

  const playMedia = (index: number) => {
    setCurrentMediaIndex(index);
    // Play the selected media file
    // Your implementation for playing media goes here
  };

  const removeMediaFromPlaylist = (indexToBeRemoved: number) => {
    setPlaylist(playlist.filter((_, index) => index != indexToBeRemoved));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="flex items-center justify-center hover:bg-transparent"
        >
          <FolderOpen width={20} height={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[400px] overflow-auto">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Playlist</span>
          <Button variant={"ghost"} className="media-input-container">
            <ListPlus className="media-icon" />
            <input
              id="media-input"
              multiple
              type="file"
              className="media-input"
              placeholder="Select media"
              accept="audio/*, video/*"
              onChange={handleMediaChange}
            />
          </Button>
        </div>
        <Separator className="my-2" />
        {playlist.length > 0 ? (
          <div>
            <ul>
              {playlist.map((media, index) => (
                <li
                  key={`${media.mediaName}_${index}`}
                  className="flex flex-col justify-center gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center">
                        {index === currentMediaIndex ? (
                          <Play width={12} height={12} />
                        ) : media.mediaType === "audio" ? (
                          <Music width={12} height={12} />
                        ) : (
                          <Clapperboard width={12} height={12} />
                        )}
                      </span>
                      <span className="overflow-hidden">{media.mediaName}</span>
                    </div>
                    <div className="flex w-8 items-center justify-center">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeMediaFromPlaylist(index)}
                        className="hover:bg-transparent"
                      >
                        <CircleX width={15} height={15} />
                      </Button>
                    </div>
                  </div>
                  {index < playlist.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="rounded-sm py-[7px] text-[#808080]">
            Playlist is empty.
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default MediaInput;
