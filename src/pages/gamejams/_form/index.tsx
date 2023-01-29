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
import NewGameJamSchema from "../../../schema/gamejam";
import { type IGameJamForm } from "../interface";
import Button from "../../../components/Button";
import Box from "../../../components/Box";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import CustomDropZone from "../../../components/CustomDropZone";
import HostSelect from "./_hostSelect";

async function uploadImage(key: string, body: any) {
  const client = new S3Client({ region: process.env.REGION });
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Body: body,
  };

  try {
    const command = new PutObjectCommand(params);
    const response = await client.send(command);
    return command;
  } catch (error) {
    console.error(error);
  }
}

const GameJamForm = ({ csrfToken, gameJam }: IGameJamForm) => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const { mutate: createGameJam } = trpc.gameJam.createOrUpdate.useMutation({
    onSuccess: ({ id }) => router.push(`/gamejams/${id}`),
  });
  const { mutate: deleteGameJam } = trpc.gameJam.delete.useMutation({
    onSuccess: () => router.push(`/gamejams/`),
  });

  /* const sessionUserId = sessionData?.user?.id || ""; */
  /* const { data: sessionUser } = trpc.user.getById.useQuery(sessionUserId); */

  // TODO: date time range https://projects.wojtekmaj.pl/react-datetimerange-picker/

  // TODO: fix listing the hosts.

  return (
    <>
      <Formik
        initialValues={{
          startDate: gameJam ? gameJam.startDate : "",
          endDate: gameJam ? gameJam.endDate : "",
          name: gameJam ? gameJam.name : "",
          description: gameJam ? gameJam.description : "",
          hosts: gameJam
            ? gameJam.hostUsers.map((host) => ({
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
          <CustomDropZone />
        </CustomForm>
      </Formik>
      {gameJam && (
        <Box>
          <p>Danger zone</p>
          <Button
            isPrimary
            isDanger
            onClick={() =>
              deleteGameJam({
                id: gameJam?.id as string,
                userId: sessionData?.user?.id || "",
              })
            }
          >
            <MdDelete />
            Delete
          </Button>
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
