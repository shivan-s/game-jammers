import { type NextPage } from "next";
import { useState } from "react";
import Button from "../../components/Button";
import CustomError from "../../components/CustomError";
import GameJamWidget from "../../components/GameJamWidget";
import SearchInput from "../../components/SearchInput";
import { trpc } from "../../utils/trpc";
import TimeFrameToggle, { type TimeFrame } from "./_timeFrameToggle";
import { BsPlusSquare } from "@react-icons/all-files/bs/BsPlusSquare";
import { useRouter } from "next/router";

const GameJams: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("all");
  const router = useRouter();

  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = trpc.gameJam.getAll.useInfiniteQuery(
    { limit: 50, q: searchQuery, timeFrame: timeFrame },
    {
      getNextPageParam: (nextPage) => nextPage.nextCursor,
    }
  );

  if (isError) {
    console.log(error);
  }

  return (
    <>
      <div className="container flex flex-col gap-12 px-4 py-4">
        <div className="flex flex-wrap gap-2">
          <SearchInput
            placeholder="Search members"
            handleSubmit={setSearchQuery}
          />
          <TimeFrameToggle
            selectedTimeFrame={timeFrame}
            handleClick={setTimeFrame}
          />
          <Button onClick={() => router.push("gamejams/create")}>
            <BsPlusSquare />
            New Jam
          </Button>
        </div>
        <div className="flex min-w-full max-w-lg flex-col items-center gap-2">
          {isError && <CustomError />}
          {isLoading && searchQuery && <>Loading...</>}
          {isSuccess && (
            <>
              <div>
                {data.pages[0]?.count === 0 && "No jams found."}
                {data.pages.map(({ gameJams }) =>
                  gameJams.map((gameJam) => {
                    return <GameJamWidget key={gameJam.id} {...gameJam} />;
                  })
                )}
              </div>
              <Button
                isLoading={isFetchingNextPage || isFetching}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? "Loading more"
                  : hasNextPage
                  ? "Load more"
                  : "Nothing more to load"}
              </Button>
              <div>{isFetching && !isFetchingNextPage && "Fetching..."}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GameJams;
