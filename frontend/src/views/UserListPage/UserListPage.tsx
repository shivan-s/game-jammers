import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../../helpers/httpCommon";
import { Link, useSearchParams } from "react-router-dom";
import { PaginatedResponse, User } from "../../interfaces";

const UserListPage: React.FC = () => {
  const fetchUsers = async (cursorParam: string | null) => {
    let res;
    if (cursorParam == null) {
      res = await apiClient.get(`/users`);
    } else {
      res = await apiClient.get(`/users?cursor=${cursorParam}`);
    }

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
    ["advocates"],
    ({ cursorParam = null }) => fetchUsers(cursorParam),
    {
      enabled: true,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.next == null) {
          return undefined;
        }
        return lastPage.next;
      },
    }
  );
  /* console.log(data); */

  if (isError) {
    console.error(error);
  }
  return (
    <>
      <h2>Users</h2>
      {isError && <p>Error!</p>}
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <>
          <ul>
            {data.pages.map((response: PaginatedResponse, idx: number) => {
              const users: User[] = response.results;
              return (
                <li key={idx}>
                  {users.map((user) => {
                    console.log(user);
                    return (
                      <Link
                        key={user.reference_id}
                        to={`/users/${user.reference_id}`}
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
};

export default UserListPage;
