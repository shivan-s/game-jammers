import { useQuery } from "@tanstack/react-query";
import React from "react";
import useApiClient from "../../../helpers/httpCommon";
import { IUser } from "../../../interfaces";

const LogoutPage: React.FC = () => {
  const apiClient = useApiClient();
  const fetchUser = async () => {
    const res = await apiClient.get("/profile/");
    return res.data;
  };

  const handleClick = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  const { data, error, isSuccess, isLoading, isError } = useQuery(
    ["logout"],
    () => fetchUser()
  );

  const user: IUser = data;
  if (isError) {
    console.log(error);
  }
  return (
    <>
      <h1>Logout</h1>
      {isError && <>Error!</>}
      {isLoading && <>Loading...</>}
      {isSuccess && (
        <>
          <h2>{user.username}</h2>
          <p>Are you sure you want to logout?</p>
          <button onClick={handleClick}>Logout</button>
        </>
      )}
    </>
  );
};

export default LogoutPage;
