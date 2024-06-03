import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Footer = () => {
  return (
    <footer className="footer absolute bottom-0 m-2 flex items-center rounded-md hover:bg-[#80808020]">
      <Avatar className="avatar mx-2 h-10 w-10 rounded-md">
        <AvatarImage src="/streamx.png" alt="StreamX logo" />
        <AvatarFallback className="avatar-fallback rounded-md text-[6px] font-bold">
          StreamX
        </AvatarFallback>
      </Avatar>

      <X width={10} height={10} />

      <div className="attribution flex items-center gap-2 p-2">
        <Avatar className="avatar h-10 w-10">
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/88267760"
            alt="Profile picture of Rishabh Singh"
          />
          <AvatarFallback className="avatar-fallback font-bold">
            RS
          </AvatarFallback>
        </Avatar>

        <div className="text-xs">
          Made with&nbsp;
          <span role="img" aria-label="love">
            ❤️
          </span>
          &nbsp;by
          <span className="block font-semibold">Rishabh Singh</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
