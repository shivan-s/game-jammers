import { type GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";
import { Form, Formik } from "formik";
import { trpc } from "../../../utils/trpc";
import CustomFieldInput from "../../../components/CustomFieldInput";
import CustomError from "../../../components/CustomError";
import CustomFieldTextArea from "../../../components/CustomFieldTextArea";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TagSelect from "./tagSelect";
import SkillLevelSelect from "./skillLevelSelect";
import capitalize from "../../../utils/capitalize";
import { uploadImage } from "../../../server/trpc/router/users/s3";
import ImageUpload from "../../../components/ImageUpload";
import { type IImage } from "../../../components/ImageUpload/interface";
import { type IUpdateProfile } from "./interface";
import Box from "../../Box";
import Button from "../../Button";
import LoadingCircle from "../../LoadingCircle";

const UpdateProfile = ({ setShowModal }: IUpdateProfile) => {
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  const csrfToken = async () => await getCsrfToken();
  const [image, setImage] = useState<IImage | null>(null);

  const {
    data: profile,
    error,
    isLoading,
    isSuccess,
    isError,
  } = trpc.profile.getByUserId.useQuery(session?.user?.id || "");

  const { mutate: updateUser, isLoading: updateLoading } =
    trpc.user.updateById.useMutation({
      onSuccess: () => {
        setShowModal(false);
      },
    });

  useEffect(() => {
    if (!profile && isSuccess) {
      router.push("/auth/new-user");
    }
  }, [profile, isSuccess, router]);

  if (isError) {
    console.error(error);
  }

  return (
    <>
      {isError && <CustomError />}
      {isLoading && (
        <div className="w-full">
          <LoadingCircle />
        </div>
      )}
      {isSuccess && profile && (
        <Formik
          initialValues={{
            username: profile.username,
            bio: profile.bio || "",
            email: profile.user.email,
            name: profile.user.name || "",
            image: { url: profile.user.image || "", data: null },
            skillLevel: {
              label: capitalize(profile.user.skillLevel),
              value: profile.user.skillLevel,
            },
            tags: profile.user.tags.map((tag) => ({
              id: tag.id,
              label: tag.name,
              value: tag,
            })),
          }}
          /* TODO: need to sort out validation */
          /* validate={toFormikValidate(z.object(EditUserProfileSchema))} */
          onSubmit={async (values) => {
            const { tags, skillLevel, image, ...restValues } = values;
            const url = await uploadImage(image.url);
            if (url) {
              await fetch(url, {
                method: "PUT",
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                body: image.data,
              });
            }
            console.log("url", url);
            console.log("values", values);
            updateUser({
              id: session?.user?.id || "",
              tags: tags.map((tag) => ({ id: tag.id })),
              skillLevel: skillLevel.value,
              image: url,
              ...restValues,
            });
          }}
        >
          <Form>
            <Box>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <ImageUpload
                image={image}
                setImage={setImage}
                imageClassName="h-36 w-36 rounded-full ring-4 ring-white"
              />
              <CustomFieldInput
                label="Username"
                maxLength={15}
                placeholder="Enter username"
                type="text"
                id="username"
                name="username"
              />
              <CustomFieldInput
                label="Display Name"
                maxLength={50}
                placeholder="Enter display name"
                type="text"
                id="name"
                name="name"
              />
              <CustomFieldInput
                label="Email"
                placeholder="Enter email"
                type="email"
                id="email"
                name="email"
              />
              <SkillLevelSelect />
              <TagSelect />
              <CustomFieldTextArea
                label="Bio"
                maxLength={500}
                placeholder="Enter bio"
                id="bio"
                name="bio"
              />
              <div className="flex gap-1">
                <Button type="submit" isPrimary disabled={updateLoading}>
                  Save
                  {updateLoading && <LoadingCircle />}
                </Button>
                <Button
                  type="reset"
                  isPrimary
                  isDanger
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </Box>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default UpdateProfile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
