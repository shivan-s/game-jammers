import { type GetServerSidePropsContext, type NextPage } from "next";
import { getCsrfToken, useSession } from "next-auth/react";
import { Formik, Form, useField, type FieldInputProps } from "formik";
import Button from "../../components/button";
import { z } from "zod";
import { toFormikValidate } from "zod-formik-adapter";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

interface ICustomField extends FieldInputProps<any> {
  component?: "textarea" | "input";
  maxLength: number;
  label: string;
}

const CustomField = ({
  component,
  maxLength,
  label,
  ...props
}: ICustomField) => {
  const [field, meta] = useField(props);
  const Component = component || "input";
  return (
    <>
      <label>
        <strong>{label}</strong> ({meta.value.length}/{maxLength})
        <Component
          className={`m-0 block w-full rounded border border-solid bg-stone-700 bg-clip-border px-4 py-2 transition ease-in-out  hover:bg-stone-600 focus:outline-none ${
            meta.touched && meta.error
              ? "border-red-400 hover:border-red-500 focus:border-red-400"
              : "border-stone-900 hover:border-blue-500 focus:border-blue-600"
          }`}
          {...field}
          {...props}
        />
        {meta.touched && meta.error && (
          <div className="text-sm text-red-300">{meta.error}</div>
        )}
      </label>
    </>
  );
};

const NewUser: NextPage = ({ csrfToken }) => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { mutate: createProfile } =
    trpc.profile.createOrUpdateProfile.useMutation({
      onSuccess: () => {
        router.push("/profile");
      },
    });

  const NewUserSchema = z.object({
    username: z
      .string({ required_error: "You must have a username." })
      .regex(/^[\w]*$/, {
        message: "Your username can only contain letters, numbers and '_'.",
      })
      .min(4, { message: "Your username must be longer than 4 characters." })
      .max(15, { message: "Your username must be shorter than 15 characters." })
      .trim(),
    bio: z
      .string()
      .max(500, { message: "Bio must be less than 500 characters." })
      .trim()
      .nullish(),
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
          <Form className="flex flex-col gap-4 rounded bg-stone-700 px-4 py-4">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <p className="text-neutral-200">Just to complete your profile...</p>
            <div className="flex flex-col gap-2">
              <CustomField
                label="Username"
                placeholder="Enter username"
                type="text"
                name="username"
                maxLength={15}
              />
              <CustomField
                component="textarea"
                label="Bio"
                placeholder="Enter bio"
                type="text"
                name="bio"
                maxLength={500}
              />
            </div>
            <Button type="submit" isPrimary>
              Submit
            </Button>
          </Form>
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
