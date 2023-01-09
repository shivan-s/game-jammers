import { Formik } from "formik";
import { type GetServerSidePropsContext, type NextPage } from "next";
import { getCsrfToken, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toFormikValidate } from "zod-formik-adapter";
import CustomField from "../../components/CustomField";
import CustomForm from "../../components/CustomForm";
import { NewGameJamSchema } from "../../server/trpc/router/gamejams";
import { trpc } from "../../utils/trpc";

const CreateGameJam: NextPage = ({ csrfToken }) => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { mutate: createGameJam } = trpc.gameJam.createOrUpdate.useMutation({
    onSuccess: ({ id }) => {
      router.push(`/gameJam/${id}`);
    },
  });

  return (
    <>
      <div className="container flex flex-col gap-12 px-4 py-4">
        <Formik
          initialValues={{
            startDate: "",
            endDate: "",
            name: "",
            description: "",
          }}
          validate={toFormikValidate(NewGameJamSchema)}
          onSubmit={(values) =>
            createGameJam({
              userId: sessionData?.user?.id || "",
              ...values,
            })
          }
        >
          <CustomForm>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <CustomField
              label="Name"
              placeholder="Enter Jam name"
              maxLength={50}
              type="text"
              id="name"
              name="name"
              required
            />
            <div className="flex flex-wrap gap-2">
              <CustomField
                label="Start"
                type="date"
                id="startDate"
                name="startDate"
                required
              />
              <CustomField
                label="End"
                type="date"
                id="name"
                name="endDate"
                required
              />
            </div>
            <CustomField
              component="textarea"
              label="Description"
              maxLength={1000}
              placeholder="Description"
              type="text"
              id="name"
              name="name"
            />
          </CustomForm>
        </Formik>
      </div>
    </>
  );
};

export default CreateGameJam;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: { csrfToken: await getCsrfToken(context) },
  };
}
