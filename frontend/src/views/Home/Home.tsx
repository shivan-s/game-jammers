import { useQuery } from "@tanstack/react-query";
import React from "react";
import useApiClient from "../../helpers/httpCommon";

const Home: React.FC = () => {
  const apiClient = useApiClient();
  const fetchIndex = async () => {
    const res = await apiClient.get("index/");
    return res.data;
  };

  const { data, isSuccess, isLoading, isError, error } = useQuery(
    ["index"],
    () => fetchIndex()
  );

  if (isError) {
    console.log(error);
  }

  return (
    <>
      {isError && <p>Error!</p>}
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <>
          <h2>Hello</h2>
          <h3>{data.message}</h3>
          <p>Let the games begin</p>
        </>
      )}
    </>
  );
};

export default Home;
