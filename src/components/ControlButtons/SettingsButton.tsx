import React, { useCallback, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsButtonProps {
  mediaRef: React.RefObject<HTMLMediaElement>;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ mediaRef }) => {
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  const updatePlaybackRate = useCallback(
    (newRate: number) => {
      if (mediaRef.current) {
        mediaRef.current.playbackRate = newRate;
        setPlaybackRate(newRate);
      }
    },
    [mediaRef],
  );

  const increasePlaybackRate = useCallback(() => {
    if (mediaRef.current) {
      const newRate = Math.min(mediaRef.current.playbackRate + 0.25, 2);
      updatePlaybackRate(newRate);
    }
  }, [mediaRef, updatePlaybackRate]);

  const decreasePlaybackRate = useCallback(() => {
    if (mediaRef.current) {
      const newRate = Math.max(mediaRef.current.playbackRate - 0.25, 0.25);
      updatePlaybackRate(newRate);
    }
  }, [mediaRef, updatePlaybackRate]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey) {
        switch (event.key) {
          case ">":
            event.preventDefault();
            increasePlaybackRate();
            break;
          case "<":
            event.preventDefault();
            decreasePlaybackRate();
            break;
        }
      } else if (event.metaKey && event.key === "/") {
        event.preventDefault();
        // Perform action for ⌘/
      }
    };

    window.addEventListener("keypress", handleKeyDown);

    return () => {
      window.removeEventListener("keypress", handleKeyDown);
    };
  }, [increasePlaybackRate, decreasePlaybackRate]);

  const handlePlaybackRateChange = (rate: number) => () => {
    updatePlaybackRate(rate);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          title="Settings"
          aria-label="Settings"
          className="settings hover:bg-transparent"
        >
          <Settings width={20} height={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>StreamX</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex gap-4">
            <span>Playback speed</span>
            <span className="text-xs text-zinc-400">
              {playbackRate === 1 ? "Normal" : `${playbackRate}x`}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuLabel>Playback</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                <DropdownMenuItem
                  key={rate}
                  onClick={handlePlaybackRateChange(rate)}
                  className="font-400"
                >
                  {playbackRate === rate ? "• " : ""}
                  {rate === 1 ? "Normal" : rate}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘/</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsButton;
