import { type GetServerSidePropsContext, type NextPage } from "next";
import { useSession } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";
import { Formik } from "formik";
import { trpc } from "../../../utils/trpc";
import CustomFieldInput from "../../../components/CustomFieldInput";
import CustomError from "../../../components/CustomError";
import CustomFieldTextArea from "../../../components/CustomFieldTextArea";
import CustomForm from "../../../components/CustomForm";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toFormikValidate } from "zod-formik-adapter";
import { z } from "zod";
import { EditUserProfileSchema } from "../../../schema/user";
import TagSelect from "./_tagSelect";
import SkillLevelSelect from "./_skillLevelSelect";

const Profile: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  const csrfToken = async () => await getCsrfToken();

  const {
    data: profile,
    error,
    isLoading,
    isSuccess,
    isError,
  } = trpc.profile.getByUserId.useQuery(session?.user?.id || "");

  const { mutate: updateUser } = trpc.user.updateById.useMutation({
    onSuccess: () => router.push("/profile"),
  });

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
      {isSuccess && profile && (
        <div className="container flex max-w-lg flex-col gap-12 py-4">
          <Formik
            initialValues={{
              username: profile.username,
              bio: profile.bio || "",
              email: profile.user.email,
              name: profile.user.name || "",
              skillLevel: profile.user.skillLevel,
              tags: profile.user.tags.map((tag) => ({
                value: tag,
                label: tag.name,
              })),
            }}
            validate={toFormikValidate(z.object(EditUserProfileSchema))}
            onSubmit={(values) => {
              const { tags, ...restValues } = values;
              updateUser({
                id: session?.user?.id || "",
                tags: tags.map((tag) => ({ id: tag.value.id })),
                ...restValues,
              });
            }}
          >
            <CustomForm buttonText="Save">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <CustomFieldInput
                label="Username"
                maxLength={15}
                placeholder="Enter username"
                type="text"
                id="username"
                name="username"
              />
              <CustomFieldInput
                label="Display Name"
                maxLength={50}
                placeholder="Enter display name"
                type="text"
                id="name"
                name="name"
              />
              <CustomFieldInput
                label="Email"
                placeholder="Enter email"
                type="email"
                id="email"
                name="email"
              />
              <CustomFieldTextArea
                label="Bio"
                maxLength={500}
                placeholder="Enter bio"
                id="bio"
                name="bio"
              />
              <SkillLevelSelect />
              <TagSelect />
            </CustomForm>
          </Formik>
        </div>
      )}
    </>
  );
};

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: { csrfToken: await getCsrfToken(context) },
  };
}
