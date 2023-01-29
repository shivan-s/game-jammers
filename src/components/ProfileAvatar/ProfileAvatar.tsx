import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../components/tooltip";
import ProfileImage from "./ProfileImage";

const ProfileAvatar = ({
  imageSize,
  user,
  ringColorClassName,
}: IProfileAvatar) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <ProfileImage
          imageSize={imageSize}
          user={user}
          ringColorClassName={ringColorClassName}
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
