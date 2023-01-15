import { type GetServerSidePropsContext, type NextPage } from "next";
import { useSession } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";
import { Formik, Form } from "formik";
import Button from "../../components/Button";
import { trpc } from "../../utils/trpc";
import CustomFieldInput from "../../components/CustomFieldInput";
import CustomError from "../../components/CustomError";

const Profile: NextPage = () => {
  const { data: session } = useSession({ required: true });
  const csrfToken = async () => await getCsrfToken();

  const {
    data: profile,
    error,
    isLoading,
    isSuccess,
    isError,
  } = trpc.profile.getByUserId.useQuery(session?.user?.id || "");

  if (isError) {
    console.error(error);
  }

  return (
    <>
      {isError && <CustomError />}
      {isLoading && <>Loading...</>}
      {isSuccess && (
        <Formik
          initialValues={{
            username: profile ? profile.username : "",
            bio: profile ? profile.bio : "",
          }}
          onSubmit={() => console.log("test")}
        >
          <Form className="flex flex-col gap-2 rounded bg-stone-700 px-4 py-4">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label htmlFor="username">Username</label>
            <CustomFieldInput
              placeholder="Enter username"
              type="text"
              id="username"
              name="username"
              required
            />
            <label htmlFor="bio">Bio</label>
            <CustomFieldInput
              components={<textarea />}
              placeholder="Enter bio"
              type="text"
              id="bio"
              name="bio"
              required
            />
            <Button type="submit" isPrimary>
              Submit
            </Button>
          </Form>
        </Formik>
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
