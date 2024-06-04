import { useState } from "react";
import Playlist from "@/Playlist";
import { MediaProps } from "@/App";
import Speaker from "./ControlButtons/Speaker";
import PlayNext from "./ControlButtons/PlayNext";
import PlayPrev from "./ControlButtons/PlayPrev";
import MediaInput from "./MediaInput/MediaInput";
import TogglePlay from "./ControlButtons/TogglePlay";
import PlayOverlay from "./ControlButtons/PlayOverlay";
import PauseOverlay from "./ControlButtons/PauseOverlay";
import PlaybackTime from "./ControlButtons/PlaybackTime";
import MediaTimeline from "./ControlButtons/MediaTimeline";
import SettingsButton from "./ControlButtons/SettingsButton";
import ToggleAutoPlay from "./ControlButtons/ToggleAutoPlay";
import MediaController from "./MediaController/MediaController";
import ToggleFullScreen from "./ControlButtons/ToggleFullScreen";
import PictureInPictureButton from "./ControlButtons/PictureInPictureButton";

interface ControllerProps {
  media: {
    mediaName: string;
    mediaUrl: string;
    mediaType: string;
  };
  autoPlay: boolean;
  playlist: MediaProps[];
  currentMediaIndex: number;
  mediaRef: React.RefObject<HTMLMediaElement>;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaylist: React.Dispatch<React.SetStateAction<MediaProps[]>>;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Controller = ({
  media,
  mediaRef,
  playlist,
  autoPlay,
  setAutoPlay,
  setPlaylist,
  currentMediaIndex,
  setCurrentMediaIndex,
}: ControllerProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full text-white">
        {isPlaying && <PlayOverlay isPlaying={isPlaying} />}
        {!isPlaying && <PauseOverlay isPlaying={isPlaying} />}
      </div>
      <MediaController>
        <div className="absolute left-0 top-0 flex items-center gap-2 px-8 py-4 text-lg">
          <Playlist
            mediaFiles={playlist}
            currentMediaIndex={currentMediaIndex}
            setCurrentMediaIndex={setCurrentMediaIndex}
          />
          <span className="text-xl">
            {playlist[currentMediaIndex].mediaName}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 mb-4 flex flex-col gap-2 px-8">
          <MediaTimeline media={media} mediaRef={mediaRef} />

          <div className="flex justify-between">
            <div
              className="flex gap-2"
              onMouseLeave={() => setIsHovered(false)}
            >
              <PlayPrev
                currentMediaIndex={currentMediaIndex}
                setCurrentMediaIndex={setCurrentMediaIndex}
              />
              <TogglePlay
                mediaRef={mediaRef}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
              <PlayNext
                playlist={playlist}
                currentMediaIndex={currentMediaIndex}
                setCurrentMediaIndex={setCurrentMediaIndex}
              />
              <Speaker
                mediaRef={mediaRef}
                isHovered={isHovered}
                setIsHovered={setIsHovered}
              />
              <PlaybackTime mediaRef={mediaRef} />
            </div>

            <div className="flex gap-2">
              <MediaInput
                playlist={playlist}
                setPlaylist={setPlaylist}
                currentMediaIndex={currentMediaIndex}
                setCurrentMediaIndex={setCurrentMediaIndex}
              />
              {playlist.length > 1 && (
                <ToggleAutoPlay autoPlay={autoPlay} setAutoPlay={setAutoPlay} />
              )}
              <SettingsButton mediaRef={mediaRef} />
              <PictureInPictureButton mediaRef={mediaRef} media={media} />
              <ToggleFullScreen />
            </div>
          </div>
        </div>
      </MediaController>
    </>
  );
};

export default Controller;
