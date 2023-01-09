import { Formik } from "formik";
import { type GetServerSidePropsContext, type NextPage } from "next";
import { getCsrfToken, useSession } from "next-auth/react";
/* import { useRouter } from "next/router"; */
import { toFormikValidate } from "zod-formik-adapter";
import CustomFieldInput from "../../components/CustomFieldInput";
import CustomFieldTextArea from "../../components/CustomFieldTextArea";
import CustomForm from "../../components/CustomForm";
import { NewGameJamSchema } from "../../server/trpc/router/gamejams";
import { trpc } from "../../utils/trpc";
import { z } from "zod";

const CreateGameJam: NextPage = ({ csrfToken }) => {
  /* const router = useRouter(); */
  const { data: sessionData } = useSession();
  const { mutate: createGameJam } = trpc.gameJam.createOrUpdate.useMutation({
    onSuccess: () => {
      console.log("yay!");
      /* router.push(`/gameJam`); */
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
          validate={toFormikValidate(z.object(NewGameJamSchema))}
          onSubmit={(values) =>
            createGameJam({
              userId: sessionData?.user?.id || "",
              ...values,
            })
          }
        >
          <CustomForm>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <CustomFieldInput
              label="Name"
              placeholder="Enter name"
              maxLength={50}
              type="text"
              id="name"
              name="name"
              required
            />
            <div className="flex flex-wrap gap-2">
              <CustomFieldInput
                label="Start"
                type="date"
                id="startDate"
                name="startDate"
                required
              />
              <CustomFieldInput
                label="End"
                type="date"
                id="endDate"
                name="endDate"
                required
              />
            </div>
            <CustomFieldTextArea
              label="Description"
              rows={5}
              maxLength={1000}
              placeholder="Enter description"
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
