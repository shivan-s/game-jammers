import { type NextPage } from "next";
import Button from "../../components/Button";

import { trpc } from "../../utils/trpc";
import ProfileWidget from "../../components/ProfileWidget";

const Members: NextPage = () => {
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
      <div className="container flex flex-col items-center gap-12 px-4 py-16 ">
        <div className="flex min-w-full max-w-lg flex-col items-center gap-2">
          {isError && <>Error!</>}
          {isLoading && <>Loading...</>}
          {isSuccess && (
            <>
              <div>
                {data.pages.map(({ users }) =>
                  users.map((user) => {
                    return <ProfileWidget {...user} />;
                  })
                )}
              </div>
              <Button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                    ? "Load more"
                    : "Nothing more to lead"}
              </Button>
              <div>{isFetching && !isFetchingNextPage && "Fetching..."}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Members;
