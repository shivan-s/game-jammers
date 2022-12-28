import { type NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const GameJam: NextPage = () => {
  const { query } = useRouter();

  const {
    data: gameJam,
    error,
    isLoading,
    isSuccess,
    isError,
    // TODO: fix type
  } = trpc.gameJam.getById.useQuery(query.id);

  if (isError) {
    console.log(error);
  }

  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          {gameJam?.name}
        </h1>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-center text-2xl text-white">
            {isError && <>Error!</>}
            {isLoading && <>Loading...!</>}
            {isSuccess && (
              <>
                <ul>
                  <li>Start: {gameJam?.startDate.toString()}</li>
                  <li>End: {gameJam?.endDate.toString()}</li>
                </ul>
                <div className="py-2">
                  <h3 className="text-4xl">Teams</h3>
                  {gameJam?.teams.length === 0 && <p>None.</p>}
                  <ul>
                    {gameJam?.teams.map((team) => (
                      <>
                        <li key={team.id}>{team.name}:</li>
                        {team.teamToUser.map(({ user }) => (
                          <li key={user.id}>{user.name}</li>
                        ))}
                      </>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameJam;
