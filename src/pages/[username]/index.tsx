import { type NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import ProfileWidget from "../../components/ProfileWidget";
import { GameJams } from "./_gameJams";
import CustomError from "../../components/CustomError";
import LoadingCircle from "../../components/LoadingCircle";

const User: NextPage = () => {
  const router = useRouter();
  const username = router.query.username as string;

  const {
    data: user,
    error,
    isLoading,
    isSuccess,
    isError,
  } = trpc.user.getByUsername.useQuery(username);

  if (isError) {
    console.error(error);
  }

  return (
    <>
      <div className="container flex flex-col gap-12 px-4 py-4">
        {isError && <CustomError />}
        {isLoading && <LoadingCircle />}
        {isSuccess && user && (
          <>
            <ProfileWidget {...user} />
            <div className="flex flex-col gap-4">
              <GameJams
                username={user.username}
                gameJams={user.currentGameJams}
                state="current"
              />
              <GameJams
                username={user.username}
                gameJams={user.upcomingGameJams}
                state="upcoming"
              />
              <GameJams
                username={user.username}
                gameJams={user.previousGameJams}
                state="previous"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default User;
