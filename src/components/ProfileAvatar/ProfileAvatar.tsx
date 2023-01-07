import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../components/tooltip";
import Image from "next/image";

const ProfileAvatar = ({
  imageSize,
  user,
  ringColorClassName,
}: IProfileAvatar) => {
  const width = Number(imageSize);
  const height = Number(imageSize);
  return (
    <Tooltip>
      <TooltipTrigger>
        <Image
          className={`rounded-full ring-4 ${ringColorClassName || "ring-current"
            }`}
          width={width}
          height={height}
          alt={user.username}
          src={user.image}
        />
      </TooltipTrigger>
      <TooltipContent>
        <div className="rounded-xl bg-stone-700 py-4 px-2.5 drop-shadow-2xl">
          <div>
            <h4 className="text-xl text-white">{user.handle}</h4>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default ProfileAvatar;
