import { type GetServerSidePropsContext, type NextPage } from "next";
import { useSession } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";
import { Formik, useField } from "formik";
import { trpc } from "../../utils/trpc";
import CustomFieldInput from "../../components/CustomFieldInput";
import CustomError from "../../components/CustomError";
import CustomFieldTextArea from "../../components/CustomFieldTextArea";
import CustomForm from "../../components/CustomForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AsyncSelect from "react-select/async";
import { type Tag } from "@prisma/client";

// Use https://stackoverflow.com/questions/66539650/formik-react-select-multiple-variables

interface ISelectedTag {
  tag: Tag;
  label: string;
}

interface ICustomAsyncSelect {
  label: string;
}

const CustomAsyncSelect = ({ label, ...props }: ICustomAsyncSelect) => {
  const [field] = useField(props);
  return (
    <label>
      <strong>{label}</strong>
      <AsyncSelect {...props} {...field} />
    </label>
  );
};

const Profile: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  const csrfToken = async () => await getCsrfToken();
  const [selectedTags, setSelectedTags] = useState<ISelectedTag[]>([]);
  const [tagSearchValue, setTagsSearchValue] = useState("");

  const {
    data: profile,
    error,
    isLoading,
    isSuccess,
    isError,
  } = trpc.profile.getByUserId.useQuery(session?.user?.id || "");

  const { data: tags } = trpc.tag.getAll.useQuery({
    q: tagSearchValue,
  });

  /* const { mutate: updateUser } = trpc.user; */
  /* const { mutate: updateProfile } = trpc.profile.createOrUpdate.useMutation({ */
  /*   onSuccess: () => console.log(""), */
  /* }); */

  useEffect(() => {
    setSelectedTags(
      profile?.user.tags.map((tag) => ({ tag: tag, label: tag.name }))
    );
    if (!profile && isSuccess) {
      router.push("/auth/new-user");
    }
  }, [profile]);

  if (isError) {
    console.error(error);
    return <CustomError />;
  }

  function filterOptions(searchValue: string) {
    const filteredTags = tags
      .map((tag) => ({ tag: tag, label: tag.name }))
      .filter((tag) =>
        tag.label.toLowerCase().includes(searchValue.toLowerCase())
      );
    return filteredTags;
  }

  const handleOnLoadOptions = (searchValue: string) => {
    setTagsSearchValue(searchValue);
    console.log(searchValue);
    return new Promise<ISelectedTag[]>((resolve) =>
      resolve(filterOptions(searchValue))
    );
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleOnChange");
    console.log(e);
    console.log(e.target);
    console.log("selectedTags", selectedTags);
    /* setSelectedTags([...selectedTags, e.target.value]); */
  };

  return (
    <>
      {isLoading && <>Loading...</>}
      {isSuccess && profile && (
        <div className="container flex max-w-lg flex-col gap-12 py-4">
          <Formik
            initialValues={{
              username: profile.username,
              bio: profile.bio || "",
              email: profile.user.email,
              name: profile.user.name,
              tags: profile.user.tags.map((tag) => ({
                tag: tag,
                label: tag.name,
              })),
            }}
            onSubmit={() => console.log("test")}
          >
            <CustomForm buttonText="Save">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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
              <CustomFieldTextArea
                label="Bio"
                maxLength={500}
                placeholder="Enter bio"
                id="bio"
                name="bio"
              />
              <CustomAsyncSelect
                label="Tags"
                name="tags"
                isMulti
                cacheOptions
                loadOptions={handleOnLoadOptions}
                onChange={handleOnChange}
              />
            </CustomForm>
          </Formik>
        </div>
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
