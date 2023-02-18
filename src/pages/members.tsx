import { type NextPage } from "next";
import Button from "../components/Button";
import { trpc } from "../utils/trpc";
import ProfileWidget from "../components/ProfileWidget";
import { useState } from "react";
import SearchInput from "../components/SearchInput";
import LoadingCircle from "../components/LoadingCircle";

const Members: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
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
    { limit: 50, q: searchQuery },
    {
      getNextPageParam: (nextPage) => nextPage.nextCursor,
      enabled: searchQuery !== "",
    }
  );

  if (isError) {
    console.log(error);
  }

  return (
    <>
      <div className="container flex flex-col gap-12 px-4 py-4">
        <SearchInput
          placeholder="Search members"
          handleSubmit={setSearchQuery}
        />
        <div className="flex min-w-full max-w-lg flex-col items-center gap-2">
          {isError && <>Error!</>}
          {isLoading && searchQuery && <LoadingCircle />}
          {isSuccess && (
            <>
              <div>
                {data.pages[0]?.count === 0 && "No members found."}
                {data.pages.map(({ users }) =>
                  users.map((user) => {
                    return <ProfileWidget key={user.id} {...user} />;
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
                    : "Nothing more to load"}
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
