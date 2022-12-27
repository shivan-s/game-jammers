import { type NextPage } from "next";
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
  } = trpc.user.getById.useQuery(query.id);

  if (isError) {
    console.log(error);
  }

  console.log(user);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-center text-2xl text-white">
        {isError && <>Error!</>}
        {isLoading && <>Loading...!</>}
        {isSuccess && (
          <>
            <ul>{user?.name}</ul>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
