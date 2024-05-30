import React, { ChangeEvent } from "react";
import "./MediaInput.css";
import { FolderOpen, ListPlus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MediaProps } from "@/App";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const MediaInput: React.FC<{
  handleMediaChange: (event: ChangeEvent<HTMLInputElement>) => void;
  playlist: MediaProps[];
}> = ({ handleMediaChange, playlist }) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <FolderOpen />
        </PopoverTrigger>
        <PopoverContent>
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
          <DropdownMenuSeparator />
          {playlist && (
            <div>
              <ul>
                {playlist.map((media) => (
                  <li key={media.mediaName}>
                    <Button onClick={() => handleMediaChange}>
                      {media.mediaName}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {playlist.length === 0 && (
            <p className="text-[#808080] rounded-sm py-[7px]">
              Playlist is empty.
            </p>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MediaInput;
