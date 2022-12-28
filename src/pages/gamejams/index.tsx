import { type NextPage } from "next";
import Link from "next/link";

import { trpc } from "../../utils/trpc";

const GameJams: NextPage = () => {
  const {
    data: gameJams,
    error,
    isLoading,
    isSuccess,
    isError,
  } = trpc.gameJam.getAll.useQuery();

  if (isError) {
    console.log(error);
  }

  console.log(gameJams);

  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Game Jams
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-center text-2xl text-white">
              {isError && <>Error!</>}
              {isLoading && <>Loading...</>}
              {isSuccess && (
                <>
                  <ul>
                    {gameJams?.map((gameJam) => {
                      return (
                        <li className="hover:underline" key={gameJam.id}>
                          <Link href={`users/${gameJam.id}`}>
                            {gameJam.name} - Teams: {gameJam.teams.length}
                          </Link>
                          - Start: {gameJam.startDate.toString()} - End:{" "}
                          {gameJam.endDate.toString()}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameJams;
