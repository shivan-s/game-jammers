import { Formik } from "formik";
import { type GetServerSidePropsContext, type NextPage } from "next";
import { getCsrfToken, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toFormikValidate } from "zod-formik-adapter";
import CustomFieldInput from "../../components/CustomFieldInput";
import CustomFieldTextArea from "../../components/CustomFieldTextArea";
import CustomForm from "../../components/CustomForm";
import { trpc } from "../../utils/trpc";
import { z } from "zod";
import NewGameJamSchema from "../../schema/gamejam";

const CreateGameJam: NextPage = ({ csrfToken }) => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { mutate: createGameJam } = trpc.gameJam.createOrUpdate.useMutation({
    onSuccess: () => {
      console.log("yay!");
      router.push(`/gameJam`);
    },
  });

  return (
    <>
      <div className="container flex flex-col gap-12 px-4 py-4">
        <Formik
          initialValues={{
            startDate: "Hello",
            endDate: "",
            name: "",
            description: "",
          }}
          validate={toFormikValidate(z.object(NewGameJamSchema))}
          onSubmit={(values) => {
            console.log(values);
            createGameJam({
              userId: sessionData?.user?.id || "",
              ...values,
            });
          }}
        >
          <CustomForm>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <p>Create game jam.</p>
            <CustomFieldInput
              label="Name"
              placeholder="Enter name"
              maxLength={50}
              type="text"
              id="name"
              name="name"
            />
            <div className="flex flex-wrap gap-2">
              <CustomFieldInput
                label="Start"
                type="date"
                id="startDate"
                name="startDate"
              />
              <CustomFieldInput
                label="End"
                type="date"
                id="endDate"
                name="endDate"
              />
            </div>
            <CustomFieldTextArea
              label="Description"
              rows={5}
              maxLength={1000}
              placeholder="Enter description"
              id="description"
              name="description"
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
