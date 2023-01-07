import { format, formatDistanceToNow } from "date-fns";
import Button from "../../../components/button";
import { type GameJamWithUsers } from "../../../server/trpc/router/users";
import { ProfileAvatar } from "./profileAvatar";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import { AiFillPlusSquare } from "@react-icons/all-files/ai/AiFillPlusSquare";

interface GameJamProps {
  username: string;
  gameJams: GameJamWithUsers[];
  state: "current" | "previous" | "upcoming";
}

const GameJamWidget = ({
  id,
  startDate,
  endDate,
  description,
  name,
  teams,
  hostUsers,
}: GameJamWithUsers) => {
  return (
    <div key={id} className="flex flex-col rounded-xl bg-stone-700">
      <div className="h-48 rounded-t-xl bg-black">Image of GameJam</div>
      <div className="flex flex-wrap justify-between">
        <div className="flex px-4 py-4">
          <div className="flex flex-col gap-1">
            <h3 className="truncate text-2xl">{name}</h3>
            <p className="flex flex-wrap gap-1 text-base text-neutral-200">
              {/* TODO: use set interval - scale for time */}
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
          <Button isPrimary={true}>
            <AiFillPlusSquare /> Join
          </Button>
          <Button>
            <FaUsers /> View Teams
          </Button>
        </div>
      </div>
    </div>
  );
};

export const GameJams = ({ username, gameJams, state }: GameJamProps) => {
  let title;
  let subtitle;
  switch (state) {
    case "current":
      title = "Current";
      subtitle = `Game jams that
        ${username} is currently participating in`;
      break;
    case "upcoming":
      title = "Upcoming";
      subtitle = `Upcoming game jams that ${username} has signed up for`;
      break;
    case "previous":
      title = "Previous";
      subtitle = `Previous game jams that ${username} participated in`;
      break;
  }
  return (
    <>
      <div>
        <h4 className="text-5xl font-bold">{title} Jams</h4>
        <p className="text-base text-neutral-300">{subtitle}</p>
      </div>
      <div>
        {gameJams.length === 0 && (
          <div className="flex items-center justify-around rounded-xl bg-stone-700 px-4 py-4">
            <p>No {title.toLowerCase()} jams.</p>
          </div>
        )}
        {gameJams.map((gameJam) => (
          <GameJamWidget key={gameJam.id} {...gameJam} />
        ))}
      </div>
    </>
  );
};
