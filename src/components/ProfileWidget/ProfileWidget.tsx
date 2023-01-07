import { FaLocationArrow } from "@react-icons/all-files/fa/FaLocationArrow";
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";
import Button from "../../components/Button";
import { type UserWithExtraFields } from "../../server/trpc/router/users";
import ProfileAvatar from "../ProfileAvatar";
import GameJamCount from "./gameJamCount";
import UserConnections from "./userConnections";
import UserDisplayTags from "./userDisplayTags";

const ProfileWidget = (
  user: UserWithExtraFields & { handle: string } & {
    connections: UserWithExtraFields[];
  }
) => {
  return (
    <div className="flex flex-col divide-y rounded-xl bg-stone-700">
      <div className="flex flex-wrap justify-between">
        <div className="flex flex-col px-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <ProfileAvatar imageSize="96" user={user} />
            <div className="flex flex-col">
              <div className="flex gap-2">
                <span>
                  <h2 className="truncate text-2xl">{user.name}</h2>
                </span>
                {user.teamToUser && (
                  <GameJamCount teamCount={user.teamToUser.length} />
                )}
              </div>
              <p className="text-base">{user.handle}</p>
            </div>
          </div>
          <p className="text-base text-neutral-300">{user.bio}</p>
        </div>
        <div>
          {user.connections && <UserConnections {...user.connections} />}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2 px-4 py-4">
        <div>{user.tags && <UserDisplayTags {...user.tags} />}</div>
        <div className="flex flex-row-reverse gap-2">
          <Button isPrimary={true}>
            <FaUserFriends /> Connect
          </Button>
          <Button>
            <FaLocationArrow /> Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileWidget;
