import React from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../helpers/httpCommon";
import { User } from "../../../interfaces";
import { useParams } from "react-router-dom";

const UsersDetailPage: React.FC = () => {
  const params = useParams();
  const userReferenceId = params.userReferenceId;

  const fetchUser = async () => {
    const res = await apiClient.get(`/users/${userReferenceId}`);
    return res.data;
  };

  const { data, error, isError, isLoading, isSuccess } = useQuery(
    ["user", userReferenceId],
    () => fetchUser()
  );

  if (isError) {
    console.error(error);
  }

  const user: User = data;

  return (
    <>
      <h2>Profile</h2>
      {isError && <p>Error!</p>}
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <>
          <h3>{user.username}</h3>
          <ul>
            <li>Date joined: {user.date_joined}</li>
          </ul>
        </>
      )}
    </>
  );
};

export default UsersDetailPage;
