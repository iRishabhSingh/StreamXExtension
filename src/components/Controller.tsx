import Playlist from "@/Playlist";
import TogglePlay from "./ControlButtons/TogglePlay";
import MediaController from "./MediaController/MediaController";
import { MediaProps } from "@/App";
import ToggleFullScreen from "./ControlButtons/ToggleFullScreen";
import PlayNext from "./ControlButtons/PlayNext";
import PlayPrev from "./ControlButtons/PlayPrev";
import Speaker from "./ControlButtons/Speaker";
import PlaybackTime from "./ControlButtons/PlaybackTime";
import PictureInPictureButton from "./ControlButtons/PictureInPictureButton";

interface ControllerProps {
  media: {
    mediaName: string;
    mediaUrl: string;
    mediaType: string;
  };
  mediaRef: React.RefObject<HTMLMediaElement>;
  playlist: MediaProps[];
  currentMediaIndex: number;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
}
const Controller = ({
  media,
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
      <div className="absolute bottom-0 left-0 right-0 px-8 mb-4 flex justify-between">
        <div className="flex">
          <PlayPrev
            currentMediaIndex={currentMediaIndex}
            setCurrentMediaIndex={setCurrentMediaIndex}
          />
          <TogglePlay mediaRef={mediaRef} />
          <PlayNext
            playlist={playlist}
            currentMediaIndex={currentMediaIndex}
            setCurrentMediaIndex={setCurrentMediaIndex}
          />
          <Speaker mediaRef={mediaRef} />
          <PlaybackTime mediaRef={mediaRef} />
        </div>
        <div className="flex">
          <PictureInPictureButton mediaRef={mediaRef} media={media} />
          <ToggleFullScreen />
        </div>
      </div>
    </MediaController>
  );
};

export default Controller;
