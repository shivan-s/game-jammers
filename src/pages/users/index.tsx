import { type NextPage } from "next";
import Link from "next/link";

import { trpc } from "../../utils/trpc";

const Users: NextPage = () => {
  const {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = trpc.user.getAll.useInfiniteQuery(
    { limit: 50 },
    { getNextPageParam: (nextPage) => nextPage.nextCursor }
  );

  if (isError) {
    console.log(error);
  }
  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Users
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-center text-2xl text-white">
              {isError && <>Error!</>}
              {isLoading && <>Loading...</>}
              {isSuccess && (
                <>
                  <ul>
                    {data.pages.map(({ users }) =>
                      users.map((user) => {
                        return (
                          <li className="hover:underline" key={user.id}>
                            <Link href={`users/${user.username}`}>
                              {user.name}
                            </Link>
                          </li>
                        );
                      })
                    )}
                  </ul>

                  <button
                    className="my-2 inline-block rounded border-2 border-solid border-white px-6 py-2.5 hover:bg-gray-100"
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                  >
                    {isFetchingNextPage
                      ? "Loading more..."
                      : hasNextPage
                      ? "Load more"
                      : "Nothing more to lead"}
                  </button>
                  <div>
                    {isFetching && !isFetchingNextPage && "Fetching..."}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
