import React, { useCallback } from "react";
import { Switch } from "../ui/switch";

interface ToggleAutoPlayProps {
  autoPlay: boolean;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleAutoPlay: React.FC<ToggleAutoPlayProps> = ({
  autoPlay,
  setAutoPlay,
}) => {
  const handleAutoPlay = useCallback(() => {
    setAutoPlay((prev) => !prev);
  }, [setAutoPlay]);

  return (
    <div title="Autoplay" className="m-2 flex items-center justify-center">
      <Switch
        checked={autoPlay}
        onCheckedChange={handleAutoPlay}
        aria-label="Toggle AutoPlay"
        className="h-2 w-6 border-none p-0 *:border-2 *:border-white data-[state=unchecked]:bg-zinc-500 *:data-[state=checked]:translate-x-2"
      />
    </div>
  );
};

export default ToggleAutoPlay;
