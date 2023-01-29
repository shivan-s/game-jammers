import { type User } from "@prisma/client";
import { ImCross } from "@react-icons/all-files/im/ImCross";
import { useState } from "react";
import { type MultiValueGenericProps } from "react-select";
import CustomAsyncSelect from "../../../components/CustomAsyncSelect";
import ProfileImage from "../../../components/ProfileAvatar/ProfileImage";
import { trpc } from "../../../utils/trpc";

interface ISelectedHost {
  value: User;
  label: string;
}

const HostSelect = (props) => {
  const [globalSearchValue, setGlobalSearchValue] = useState<string>("");
  const { data: users } = trpc.user.getAll.useQuery(
    {
      cursor: null,
      q: globalSearchValue,
    },
    { enabled: globalSearchValue !== "" }
  );

  function filterOptions(searchValue: string) {
    const filteredHosts = users
      ? users
          .map((user) => ({ value: user, label: user.handle }))
          .filter((user) =>
            user.label.toLowerCase().includes(searchValue.toLowerCase())
          )
      : [];
    return filteredHosts;
  }

  const handleOnChange = (e) => {
    console.log(e);
    /* setHosts([...hosts, e.target.value]); */
  };

  const handleOnLoadOptions = (searchValue: string) => {
    setGlobalSearchValue(searchValue);
    return new Promise<ISelectedHost[]>((resolve) =>
      resolve(filterOptions(searchValue))
    );
  };

  const MultiValueContainer = (props: MultiValueGenericProps<User>) => {
    const { label, value } = props.data;
    return (
      <div className="flex">
        <div className="rounded-l-full bg-stone-500 px-2 py-1 text-sm">
          <span className="flex gap-1">
            <ProfileImage imageSize="24" user={value} />
            {label}
          </span>
        </div>
        <span className="rounded-r-full bg-stone-500 px-2 py-1 text-sm hover:bg-red-300 hover:text-red-700">
          <ImCross />
        </span>
      </div>
    );
  };

  return (
    <CustomAsyncSelect
      label="Hosts"
      name="hosts"
      components={{ MultiValueContainer }}
      loadOptions={handleOnLoadOptions}
      isMulti
      onChange={handleOnChange}
      {...props}
    />
  );
};

export default HostSelect;
