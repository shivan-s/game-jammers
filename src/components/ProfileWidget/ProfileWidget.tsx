import { FaLocationArrow } from "@react-icons/all-files/fa/FaLocationArrow";
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Button from "../../components/Button";
import { type DetailUserExtraFields } from "../../server/trpc/router/users";
import DisplayTags from "../DisplayTags";
import ProfileAvatar from "../ProfileAvatar";
import SkillLevelTag from "../SkillLevelTag";
import GameJamCount from "./gameJamCount";
import UserConnections from "./userConnections";

const ProfileWidget = (
  user: DetailUserExtraFields & { handle: string } & {
    connections: DetailUserExtraFields[];
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
                  <h2 className="truncate text-2xl">
                    <Link href={`/${user.username}`}>{user.name}</Link>
                  </h2>
                </span>
                {user.teamToUser && (
                  <GameJamCount teamCount={user.teamToUser.length} />
                )}
              </div>
              <p className="text-base">{user.handle}</p>
            </div>
          </div>
          <p className="text-base text-neutral-300">{user.profile.bio}</p>
          <p className="text-base text-neutral-300">
            Member for{" "}
            {formatDistanceToNow(user.dateJoined, { addSuffix: false })}.
          </p>
        </div>
        <div>{user.connections && <UserConnections {...user} />}</div>
      </div>
      <div className="flex flex-col justify-between gap-2 px-4 py-4">
        <div className="flex flex-wrap gap-3">
          <div>{<SkillLevelTag skillLevel={user.skillLevel} />}</div>
          <div>{user.tags && <DisplayTags tags={user.tags} />}</div>
        </div>
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
