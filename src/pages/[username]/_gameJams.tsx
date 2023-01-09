import GameJamWidget from "../../components/GameJamWidget";
import { type GameJamProps } from "./interface";

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
