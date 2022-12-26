import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import apiClient from "../../helpers/axios";

const fetchUser = async (userReferenceId: string) => {
  const res = await apiClient.get(`/users/${userReferenceId}`);
  return res.data;
};

export default function User() {
  const router = useRouter();
  const userReferenceId =
    typeof router.query?.reference_id === "string"
      ? router.query.reference_id
      : "";

  const { data, error, isError, isLoading, isSuccess } = useQuery(
    ["user", userReferenceId],
    () => fetchUser(userReferenceId),
    {
      enabled: userReferenceId.length > 0,
    }
  );

  if (isError) {
    console.error(error);
  }

  const user = data;

  return (
    <>
      <h2>Profile</h2>
      {isError && <p>Error!</p>}
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <>
          <h3>{user.username}</h3>
          <ul>
            <li>Username: {user.username}</li>
            <li>Display Name: {user.name}</li>
            <li>Date joined: {user.date_joined}</li>
          </ul>
        </>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const referenceId = context.params?.reference_id as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["user", referenceId], () =>
    fetchUser(referenceId)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
