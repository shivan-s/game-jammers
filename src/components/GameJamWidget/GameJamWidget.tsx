import { AiFillPlusSquare } from "@react-icons/all-files/ai/AiFillPlusSquare";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import { format, formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type GameJamWithUsers } from "../../server/trpc/router/users";
import Button from "../Button";
import ProfileAvatar from "../ProfileAvatar";
import Image from "next/image";

const GameJamWidget = ({
  id,
  image,
  startDate,
  endDate,
  description,
  name,
  teams,
  hostUsers,
}: GameJamWithUsers) => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  return (
    <div key={id} className="flex flex-col rounded-xl bg-stone-700">
      {image ? (
        <Image className="h-48 rounded-t-xl" src={image} alt={name} />
      ) : (
        <div className="h-48 rounded-t-xl bg-black" />
        // TODO: come up with a fall back image
      )}
      <div className="flex flex-wrap justify-between">
        <div className="flex px-4 py-4">
          <div className="flex flex-col gap-1">
            <h3 className="truncate text-2xl">{name}</h3>
            <p className="flex flex-wrap gap-1 text-base text-neutral-200">
              {formatDistanceToNow(startDate, {
                includeSeconds: true,
                addSuffix: true,
              })}{" "}
              <strong>&middot;</strong> {format(startDate, "MMMM do yyyy")}{" "}
              &mdash; {format(endDate, "MMMM do yyyy")}
            </p>
            <p className="truncate text-base text-neutral-400">{description}</p>
          </div>
        </div>
        <div className="flex flex-col px-4 py-4">
          <div className="flex -space-x-2">
            {teams.map(({ teamToUser }) =>
              teamToUser.map(({ user }) => (
                <ProfileAvatar
                  ringColorClassName="ring-stone-700"
                  key={user.id}
                  imageSize="64"
                  user={user}
                />
              ))
            )}
          </div>
          <div className="flex justify-between gap-2">
            <div className="text-xs text-neutral-200">
              {teams.reduce((acc, team) => acc + team.teamToUser.length, 0)}{" "}
              {teams.reduce((acc, team) => acc + team.teamToUser.length, 0) ===
                1
                ? "participant"
                : "participants"}
            </div>
            <div className="text-xs">N mutual</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-b-xl bg-stone-400 px-4 py-4">
        <div className="flex flex-wrap gap-4">
          <p className="text-neutral-200">Hosted by</p>
          <>
            {hostUsers.map((user) => {
              return (
                <span className="flex gap-2" key={user.id}>
                  <ProfileAvatar imageSize="32" user={user} />
                  <p className="text-bold">{user.username}</p>
                </span>
              );
            })}
          </>
        </div>
        <div className="flex flex-row-reverse gap-2">
          {hostUsers
            .map((hostUser) => hostUser.id)
            .includes(sessionData?.user?.id || "") && (
              <Button onClick={() => router.push(`/gamejams/${id}/update`)}>
                <FiEdit /> Edit Jam
              </Button>
            )}
          <Button isPrimary={true}>
            <AiFillPlusSquare /> Join
          </Button>
          <Button onClick={() => router.push(`/gamejams/${id}`)}>
            <FaUsers /> View Teams
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameJamWidget;
