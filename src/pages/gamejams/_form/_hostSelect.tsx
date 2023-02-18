import { type User } from "@prisma/client";
import { useState } from "react";
import { type MultiValueGenericProps } from "react-select";
import CustomAsyncSelect from "../../../components/CustomSelect/async/CustomAsyncSelect";
import ProfileImage from "../../../components/ProfileAvatar/ProfileImage";
import { trpc } from "../../../utils/trpc";
import { type ISelectedHost } from "./interface";

const HostSelect = () => {
  const [globalSearchValue, setGlobalSearchValue] = useState<string>("");

  const { data, isLoading } = trpc.user.getAll.useQuery({
    cursor: null,
    q: globalSearchValue,
  });
  const users = data ? data.users : [];

  function filterOptions(searchValue: string): ISelectedHost[] {
    const filteredHosts = users
      ? users
          .map((user) => ({ value: user, label: user.handle }))
          .filter((user) =>
            user.label.toLowerCase().includes(searchValue.toLowerCase())
          )
      : [];
    return filteredHosts;
  }

  const handleOnLoadOptions = (searchValue: string) => {
    setGlobalSearchValue(searchValue);
    return new Promise<ISelectedHost[]>((resolve) =>
      resolve(filterOptions(searchValue))
    );
  };

  const MultiValueLabel = (props: MultiValueGenericProps<User>) => {
    const { label, value } = props.data;
    return (
      <div className="rounded-l-full bg-stone-500 px-2 py-1 text-sm">
        <span className="flex gap-1">
          <ProfileImage imageSize="24" user={value} />
          {label}
        </span>
      </div>
    );
  };

  return (
    <CustomAsyncSelect
      label="Hosts"
      name="hosts"
      loadOptions={handleOnLoadOptions}
      isLoading={isLoading}
      isMulti
      isClearable={false}
      extraComponents={{ MultiValueLabel }}
      classNames={{
        multiValueRemove: () =>
          "rounded-r-full bg-stone-500 hover:text-red-700 hover:bg-red-300 py-1 pr-2 pl-1",
      }}
      placeholder="Select hosts"
    />
  );
};

export default HostSelect;
