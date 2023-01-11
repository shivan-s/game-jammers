import { type NextPage } from "next";
import { useRouter } from "next/router";
import CustomError from "../../components/CustomError";
import GameJamWidget from "../../components/GameJamWidget";
import { trpc } from "../../utils/trpc";

const GameJam: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const {
    data: gameJam,
    error,
    isError,
    isLoading,
    isSuccess,
  } = trpc.gameJam.getById.useQuery(id);

  if (isError) {
    console.log(error);
  }

  console.log(gameJam);

  return (
    <>
      <div className="container flex flex-col gap-12 px-4 py-4">
        {isError && (
          <>
            <CustomError />
          </>
        )}
        {isLoading && <>Loading...</>}
        {isSuccess && gameJam && (
          <>
            <GameJamWidget {...gameJam} />
            <div className="flex flex-col gap-4">
              {gameJam?.teams.length === 0 && <p>No Teams.</p>}
              {gameJam?.teams.map((team) => (
                <>
                  <li key={team.id}>{team.name}:</li>
                  {team.teamToUser.map(({ user }) => (
                    <li key={user.id}>{user.name}</li>
                  ))}
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GameJam;
