import { type GetServerSidePropsContext, type NextPage } from "next";
import { getCsrfToken, useSession } from "next-auth/react";
import { Formik } from "formik";
import { toFormikValidate } from "zod-formik-adapter";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import CustomForm from "../../components/CustomForm";
import CustomFieldInput from "../../components/CustomFieldInput";
import CustomFieldTextArea from "../../components/CustomFieldTextArea";
import ProfileSchema from "../../schema/profile";
import { z } from "zod";
import CustomError from "../../components/CustomError";
import { useEffect } from "react";

const NewUser: NextPage = ({ csrfToken }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    data: profile,
    error,
    isError,
    isLoading,
    isSuccess,
  } = trpc.profile.getByUserId.useQuery(session?.user?.id || "");
  const { mutate: createProfile } = trpc.profile.createOrUpdate.useMutation({
    onSuccess: () => {
      router.push("/profile");
    },
  });

  useEffect(() => {
    if (profile?.username) {
      router.push("/profile");
    }
  }, [profile]);

  if (isError) {
    console.error(error);
    return <CustomError />;
  }

  return (
    <>
      {isLoading && <>Loading...</>}
      {isSuccess && !profile && (
        <div className="container flex max-w-lg flex-col gap-12 py-4">
          <Formik
            initialValues={{
              username: "",
              bio: "",
            }}
            validate={toFormikValidate(z.object(ProfileSchema))}
            onSubmit={(values) =>
              createProfile({
                userId: session?.user?.id || "",
                ...values,
              })
            }
          >
            <CustomForm>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <p className="text-neutral-200">
                You need to complete your profile...
              </p>
              <CustomFieldInput
                label="Username"
                placeholder="Enter username"
                type="text"
                name="username"
                maxLength={15}
              />
              <CustomFieldTextArea
                label="Bio"
                placeholder="Enter bio"
                name="bio"
                maxLength={500}
              />
            </CustomForm>
          </Formik>
        </div>
      )}
    </>
  );
};

export default NewUser;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: { csrfToken: await getCsrfToken(context) },
  };
}
