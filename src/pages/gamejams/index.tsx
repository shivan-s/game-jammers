import { type NextPage } from "next";
import { useState } from "react";
import Button from "../../components/Button";
import CustomError from "../../components/CustomError";
import GameJamWidget from "../../components/GameJamWidget";
import SearchInput from "../../components/SearchInput";
import { trpc } from "../../utils/trpc";
import TimeFrameToggle, { type TimeFrame } from "./_timeFrameToggle";
import { BsPlusSquare } from "@react-icons/all-files/bs/BsPlusSquare";
import LoadingCircle from "../../components/LoadingCircle";
import Modal from "../../components/Modal";
import GameJamForm from "./_form";

const GameJams: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("all");
  const [showModal, setShowModal] = useState<boolean>(false);

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
      <div className="flex flex-wrap gap-2">
        <SearchInput placeholder="Search jams" handleSubmit={setSearchQuery} />
        <TimeFrameToggle
          selectedTimeFrame={timeFrame}
          handleClick={setTimeFrame}
        />
        <Button onClick={() => setShowModal(true)}>
          <BsPlusSquare />
          New Jam
        </Button>
      </div>
      <div className="flex min-w-full max-w-lg flex-col items-center gap-2">
        {isError && <CustomError />}
        {isLoading && <LoadingCircle />}
        {isSuccess && (
          <>
            <div className="flex flex-col gap-4">
              {data.pages[0]?.count === 0 && "No jams found."}
              {data.pages.map(({ gameJams }) =>
                gameJams.map((gameJam) => {
                  return <GameJamWidget key={gameJam.id} {...gameJam} />;
                })
              )}
            </div>
            {isFetchingNextPage && hasNextPage && (
              <Button
                isLoading={isFetchingNextPage || isFetching}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                Load more
              </Button>
            )}
            <div>{isFetching && !isFetchingNextPage && <LoadingCircle />}</div>
          </>
        )}
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        exitOnOutsideClick={false}
      >
        {/* New GameJam form */}
        <GameJamForm setShowModal={setShowModal} />
      </Modal>
    </>
  );
};

export default GameJams;
