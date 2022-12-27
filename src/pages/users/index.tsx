import { type NextPage } from "next";

import { trpc } from "../../utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#801818] to-[#151620]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Users
          </h1>
          <div className="flex flex-col items-center gap-2">
            <Users />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const Users: React.FC = () => {
  const {
    data: users,
    error,
    isLoading,
    isSuccess,
    isError,
  } = trpc.user.getAll.useQuery();

  if (isError) {
    console.log(error);
  }

  console.log(users);
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-center text-2xl text-white">
        {isError && <>Error!</>}
        {isLoading && <>Loading...!</>}
        {isSuccess && (
          <>
            <ul>
              {users.map((user) => {
                return <li key={user.id}>{user.name}</li>;
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
