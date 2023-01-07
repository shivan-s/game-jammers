import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Button from "../../components/button";
import { trpc } from "../../utils/trpc";

const Profile: NextPage = () => {
  const { data: session } = useSession({ required: true });

  const {
    data: profile,
    error,
    isLoading,
    isSuccess,
    isError,
  } = trpc.profile.getByUserId.useQuery(session?.user?.id || "");

  if (isError) {
    console.error(error);
  }

  console.log(profile);

  return (
    <>
      {isError && "Error!"}
      {isLoading && "Loading"}
      {isSuccess && (
        <>
          <div className="container flex flex-col gap-12 px-4 py-4">
            <div className="min-w-md flex flex-col gap-4 rounded bg-stone-700 px-4 py-4">
              <div className="flex flex-col gap-2">
                <label>
                  <strong>Username</strong>
                  <input
                    className="m-0 block w-full rounded border border-solid border-stone-900 bg-clip-border px-4 py-2 hover:bg-stone-600"
                    disabled
                    value={profile.username}
                  />
                </label>
                <label>
                  <strong>Bio</strong>
                  <input
                    className="m-0 block w-full rounded border border-solid border-stone-900 bg-clip-border px-4 py-2 hover:bg-stone-600"
                    disabled
                    value={profile.bio}
                  />
                </label>
              </div>
              <Button isPrimary>Edit</Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
