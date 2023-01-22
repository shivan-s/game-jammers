import { useRouter } from "next/router";
import { type Dispatch, type SetStateAction } from "react";

const timeFrames = ["all", "current", "previous", "upcoming"] as const;

export type TimeFrame = typeof timeFrames[number];

interface ITimeFrameToggle {
  selectedTimeFrame: TimeFrame;
  handleClick: Dispatch<SetStateAction<TimeFrame>>;
}

const TimeFrameToggle = ({
  selectedTimeFrame,
  handleClick,
}: ITimeFrameToggle) => {
  const router = useRouter();
  return (
    <>
      <div className="flex space-x-0 divide-x divide-stone-700">
        {timeFrames.map((timeFrame, idx) => {
          /* router.push(`/gamejam?frame=${timeFrame}`); */
          return (
            <button
              key={idx}
              onClick={() => handleClick(timeFrame)}
              className={`px-4 py-2 ${
                selectedTimeFrame === timeFrame
                  ? "bg-white text-stone-800 hover:underline"
                  : "bg-stone-800 hover:bg-stone-700"
              }
              ${idx === 0 && "rounded-l-full"}
              ${idx === timeFrames.length - 1 && "rounded-r-full"}
              `}
            >
              {timeFrame}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default TimeFrameToggle;
