import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BaseInput from "../../components/BaseInput";
import BaseTextArea from "../../components/BaseTextArea/BaseTextArea";
import Box from "../../components/Box";
import Button from "../../components/Button";
import CustomError from "../../components/CustomError";
import DisplayTags from "../../components/DisplayTags";
import SkillLevelTag from "../../components/SkillLevelTag";
import { trpc } from "../../utils/trpc";

const Profile: NextPage = () => {
  const { data: session } = useSession({ required: true });
  const router = useRouter();

  const {
    data: profile,
    error,
    isLoading,
    isSuccess,
    isError,
  } = trpc.profile.getByUserId.useQuery(session?.user?.id || "");

  useEffect(() => {
    if (!profile && isSuccess) {
      router.push("/auth/new-user");
    }
  }, [profile]);

  if (isError) {
    console.error(error);
    return <CustomError />;
  }

  return (
    <>
      {isLoading && <>Loading...</>}
      {isSuccess && session && session.user && profile && (
        <>
          <div className="container flex max-w-lg flex-col gap-12 px-4 py-4">
            <Box>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  <label>
                    <strong>Avatar</strong>
                    <Image
                      className="rounded-full ring-4 ring-current"
                      width="128"
                      height="128"
                      alt={profile.username}
                      src={session.user.image || ""}
                    />
                  </label>
                  <div className="flex flex-col gap-2">
                    <label>
                      <strong>Skill level</strong>
                      <SkillLevelTag skillLevel={profile.user.skillLevel} />
                    </label>
                    <label>
                      <strong>Tags</strong>
                      <DisplayTags tags={profile.user.tags} />
                    </label>
                  </div>
                </div>
                <BaseInput
                  label="Username"
                  name="username"
                  disabled
                  value={profile.username}
                  placeholder="Username empty"
                />
                <BaseInput
                  label="Display Name"
                  name="displayName"
                  disabled
                  value={session.user.name || ""}
                  placeholder="Display name empty"
                />
                <BaseInput
                  label="Email"
                  name="email"
                  disabled
                  value={session.user.email || ""}
                  placeholder="Email empty"
                />
                <BaseTextArea
                  label="Bio"
                  name="bio"
                  disabled
                  value={profile.bio || ""}
                  placeholder="Bio empty"
                />
              </div>
              <Button
                intent="primary"
                isPrimary
                onClick={() => router.push("/profile/update")}
              >
                Edit Profile
              </Button>
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
