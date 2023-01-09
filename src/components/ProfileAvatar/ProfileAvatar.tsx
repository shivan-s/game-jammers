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
          className={`rounded-full ring-4 ${
            ringColorClassName || "ring-current"
          }`}
          width={width}
          height={height}
          alt={user.username}
          src={user.image}
        />
      </TooltipTrigger>
      <TooltipContent>
        <div className="rounded-xl bg-stone-700 py-4 px-2.5 shadow-md shadow-stone-600">
          <h4 className="text-xl text-white">{user.name}</h4>
          <h4 className="text-base text-white">{user.handle}</h4>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default ProfileAvatar;
