import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import queryString from "query-string";
import apiClient from "../../helpers/axios";

export default function UsersList() {
  const fetchUsers = async (pageParam: string | null) => {
    const res = await apiClient.get(
      `/users${pageParam ? `?cursor=${pageParam}` : ""}`
    );
    return res.data;
  };

  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["users"],
    ({ pageParam = null }) => fetchUsers(pageParam),
    {
      getNextPageParam: (nextPage) => {
        if (nextPage.next == null) {
          return undefined;
        }
        return queryString.parse(queryString.extract(nextPage.next))["cursor"];
      },
    }
  );

  if (isError) {
    console.log(error);
  }

  return (
    <>
      <h2>Users</h2>
      {isError && <p>Error!</p>}
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <>
          <ul>
            {data.pages.map((response, idx: number) => {
              const users = response.results;
              return (
                <li key={idx}>
                  {users.map((user) => {
                    return (
                      <Link
                        key={user.reference_id}
                        href={`/users/${user.reference_id}`}
                      >
                        {user.username}
                      </Link>
                    );
                  })}
                </li>
              );
            })}
          </ul>
          <div>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                  ? "Load more"
                  : "Nothing more to load"}
            </button>
          </div>
          <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
        </>
      )}
    </>
  );
}
