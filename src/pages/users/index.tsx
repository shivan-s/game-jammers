import { type NextPage } from "next";
import Link from "next/link";

import { trpc } from "../../utils/trpc";

const Users: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#801818] to-[#151620]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Users
          </h1>
          <div className="flex flex-col items-center gap-2">
            <UsersList />
          </div>
        </div>
      </main>
    </>
  );
};

export default Users;

const UsersList: React.FC = () => {
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

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-center text-2xl text-white">
        {isError && <>Error!</>}
        {isLoading && <>Loading...!</>}
        {isSuccess && (
          <>
            <ul>
              {users.map((user) => {
                return (
                  <li key={user.id}>
                    <Link href={`users/${user.id}`}>{user.name}</Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
