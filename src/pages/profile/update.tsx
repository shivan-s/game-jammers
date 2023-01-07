import { type GetServerSidePropsContext, type NextPage } from "next";
import { useSession } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";
import { Formik, Form, Field, type FieldAttributes } from "formik";
import Button from "../../components/button";
import { trpc } from "../../utils/trpc";

interface INewUser {
  username: string;
  bio: string;
}

const CustomField = (props: FieldAttributes<any>) => {
  return (
    <Field
      className="m-0 block w-full rounded border border-solid border-stone-900 bg-stone-700 bg-clip-border px-4 py-2 transition ease-in-out hover:border-blue-500 hover:bg-stone-600 focus:border-blue-600 focus:outline-none"
      {...props}
    />
  );
};

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

  console.log(profile);

  return (
    <>
      {isError && "Error!"}
      {isLoading && "Loading"}
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
            <CustomField
              placeholder="Enter username"
              type="text"
              id="username"
              name="username"
              required
            />
            <label htmlFor="bio">Bio</label>
            <CustomField
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
