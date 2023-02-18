import { Formik } from "formik";
import { type GetServerSidePropsContext } from "next";
import { getCsrfToken, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toFormikValidate } from "zod-formik-adapter";
import CustomFieldInput from "../../../components/CustomFieldInput";
import CustomFieldTextArea from "../../../components/CustomFieldTextArea";
import CustomForm from "../../../components/CustomForm";
import { trpc } from "../../../utils/trpc";
import { z } from "zod";
import Box from "../../../components/Box";
import NewGameJamSchema from "../../../schema/gamejam";
import { type IGameJamForm } from "../interface";
import HostSelect from "./_hostSelect";
import { formatISO } from "date-fns";
import DeleteGameJam from "./_delete";
import { type User } from "@prisma/client";
import ImageUpload from "./_uploadImage";

const GameJamForm = ({ csrfToken, gameJam }: IGameJamForm) => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const { mutate: createGameJam } = trpc.gameJam.createOrUpdate.useMutation({
    onSuccess: ({ id }) => router.push(`/gamejams/${id}`),
  });

  return (
    <>
      <Formik
        initialValues={{
          startDate:
            gameJam && formatISO(gameJam.startDate, { representation: "date" }),
          endDate:
            gameJam && formatISO(gameJam.endDate, { representation: "date" }),
          name: gameJam ? gameJam.name : "",
          description: gameJam ? gameJam.description : "",
          hosts: gameJam
            ? gameJam.hostUsers.map((host: User) => ({
                value: host,
                label: host.handle,
              }))
            : [],
        }}
        validate={toFormikValidate(z.object(NewGameJamSchema))}
        onSubmit={(values) => {
          createGameJam({
            id: gameJam?.id,
            userId: sessionData?.user?.id || "",
            ...values,
          });
        }}
      >
        <CustomForm>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <p>Create game jam.</p>
          <HostSelect />
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
          <ImageUpload />
        </CustomForm>
      </Formik>
      {gameJam && (
        <Box>
          <p>Danger Zone</p>
          <DeleteGameJam
            gameJam={gameJam}
            sessionUserId={sessionData?.user?.id || ""}
          />
        </Box>
      )}
    </>
  );
};

export default GameJamForm;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: { csrfToken: await getCsrfToken(context) },
  };
}
