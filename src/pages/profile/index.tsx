import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CustomError from "../../components/CustomError";
import LoadingCircle from "../../components/LoadingCircle";
import ProfileWidget from "../../components/ProfileWidget";
import { trpc } from "../../utils/trpc";

const Profile: NextPage = () => {
  const { data: session } = useSession({ required: true });
  const router = useRouter();

  const {
    data: user,
    error,
    isLoading,
    isSuccess,
    isError,
  } = trpc.user.getById.useQuery(session?.user?.id || "");

  useEffect(() => {
    if (!user?.profile && isSuccess) {
      router.push("/auth/new-user");
    }
  }, [user, isSuccess, router]);

  if (isError) {
    console.error(error);
    return <CustomError />;
  }

  return (
    <div className="container flex flex-col gap-12 px-4 py-4">
      {isError && <CustomError />}
      {isLoading && <LoadingCircle />}
      {isSuccess && user && (
        <>
          <ProfileWidget {...user} />
          <div className="flex flex-col gap-4">View GameJams</div>
        </>
      )}
    </div>
  );
};

export default Profile;
