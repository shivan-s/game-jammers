import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const User: NextPage = () => {
  const { query } = useRouter();

  const {
    data: user,
    error,
    isLoading,
    isSuccess,
    isError,
    // TODO: fix type
  } = trpc.user.getById.useQuery(query.id);

  if (isError) {
    console.log(error);
  }

  console.log("user", user);

  /* const now = new Date(); */
  /* const gameJamesFuture = gameJamsEntered.filter( */
  /*   (gameJam) => gameJam.startDate < now */
  /* ); */
  /* const gameJamesPast = gameJamsEntered.filter( */
  /*   (gameJam) => gameJam.startDate < now */
  /* ); */

  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          {user?.name}
        </h1>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-center text-2xl text-white">
            {isError && <>Error!</>}
            {isLoading && <>Loading...!</>}
            {isSuccess && (
              <>
                <ul>
                  <li>Date Joined: {user?.dateJoined.toString()}</li>
                  <li>Bio: {user?.bio}</li>
                </ul>
                <div className="py-2">
                  <h3 className="text-4xl">Game Jams Participated</h3>
                  {user?.teamToUser.length === 0 && <p>None.</p>}
                  <ul>
                    {user?.teamToUser.map(({ team }) => (
                      <li key={team.id}>
                        {team.name} -{" "}
                        <Link href={`/gamejams/${team.gameJam.id}`}>
                          {team.gameJam.name}
                        </Link>
                      </li>
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

export default User;
