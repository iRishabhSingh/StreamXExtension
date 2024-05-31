import Playlist from "@/Playlist";
import TogglePlay from "./TogglePlay";
import ControlButtons from "./ControlButtons/ControlButtons";
import MediaController from "./MediaController/MediaController";
import { MediaProps } from "@/App";

interface ControllerProps {
  mediaRef: React.RefObject<HTMLMediaElement>;
  playlist: MediaProps[];
  currentMediaIndex: number;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
}
const Controller = ({
  mediaRef,
  playlist,
  currentMediaIndex,
  setCurrentMediaIndex,
}: ControllerProps) => {
  return (
    <MediaController>
      <div className="absolute top-0 left-0 px-8 py-4 text-lg flex items-center">
        <Playlist
          mediaFiles={playlist}
          currentMediaIndex={currentMediaIndex}
          setCurrentMediaIndex={setCurrentMediaIndex}
        />
        <span>{playlist[currentMediaIndex].mediaName}</span>
      </div>
      <ControlButtons>
        <TogglePlay mediaRef={mediaRef} />
      </ControlButtons>
    </MediaController>
  );
};

export default Controller;
