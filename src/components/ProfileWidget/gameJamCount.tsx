import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../components/tooltip";

const GameJamCount = ({ teamCount }: IGameJameCount) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <span className="rounded-full px-1.5 text-xs ring-2 ring-white">
          {teamCount}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <div className="inline-block rounded-xl bg-stone-700 py-4 px-2.5 drop-shadow-2xl">
          <div>
            <h4 className="text-white">Game Jams Participated: {teamCount}</h4>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default GameJamCount;
