import { type GetServerSidePropsContext, type NextPage } from "next";
import { getCsrfToken, useSession } from "next-auth/react";
import { Formik } from "formik";
import { toFormikValidate } from "zod-formik-adapter";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import CustomForm from "../../components/CustomForm";
import CustomFieldInput from "../../components/CustomFieldInput";
import { NewUserSchema } from "../../server/trpc/router/profiles";
import CustomFieldTextArea from "../../components/CustomFieldTextArea";

const NewUser: NextPage = ({ csrfToken }) => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { mutate: createProfile } =
    trpc.profile.createOrUpdateProfile.useMutation({
      onSuccess: () => {
        router.push("/profile");
      },
    });

  return (
    <>
      <div className="container flex max-w-sm flex-col gap-12 px-4 py-4">
        <Formik
          initialValues={{
            username: "",
            bio: "",
          }}
          validate={toFormikValidate(NewUserSchema)}
          onSubmit={(values) =>
            createProfile({
              userId: sessionData?.user?.id || "",
              ...values,
            })
          }
        >
          <CustomForm>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <p className="text-neutral-200">Just to complete your profile...</p>
            <div className="flex flex-col gap-2">
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
                type="text"
                name="bio"
                maxLength={500}
              />
            </div>
          </CustomForm>
        </Formik>
      </div>
    </>
  );
};

export default NewUser;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: { csrfToken: await getCsrfToken(context) },
  };
}
