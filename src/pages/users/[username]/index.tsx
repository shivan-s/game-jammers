import { type NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import { ProfileWidget } from "./profileWidget";
import { GameJams } from "./gameJams";
import { Loading } from "./loading";
import { CustomError } from "./customError";

const User: NextPage = () => {
  const { query } = useRouter();
  const {
    data: user,
    error,
    isLoading,
    isSuccess,
    isError,
  } = trpc.user.getByUsername.useQuery(
    typeof query.username === "string" ? query.username : ""
  );

  if (isError) {
    console.error(error);
  }

  return (
    <>
      {isError && <CustomError />}
      {isLoading && <Loading />}
      {isSuccess && user && (
        <div className="container flex flex-col gap-12 px-4 py-4 md:w-full">
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
        </div>
      )}
    </>
  );
};

export default User;
