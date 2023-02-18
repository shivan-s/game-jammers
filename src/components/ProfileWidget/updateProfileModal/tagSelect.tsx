import CustomAsyncSelect from "../../../components/CustomSelect/async";
import getTagColor from "../../../utils/tagColors";
import { useState } from "react";
import { type ISelectedTag } from "./interface";
import { trpc } from "../../../utils/trpc";

const TagSelect = () => {
  const [tagSearchValue, setTagsSearchValue] = useState<string>("");

  const { data: tags, isLoading } = trpc.tag.getAll.useQuery({
    q: tagSearchValue,
  });

  function filterOptions(searchValue: string): ISelectedTag[] {
    const filteredTags = tags
      ? tags
        .map((tag) => ({ value: tag, label: tag.name }))
        .filter((tag) =>
          tag.label.toLowerCase().includes(searchValue.toLowerCase())
        )
      : [];
    return filteredTags;
  }

  const handleOnLoadOptions = (searchValue: string) => {
    setTagsSearchValue(searchValue);
    return new Promise<ISelectedTag[]>((resolve) =>
      resolve(filterOptions(searchValue))
    );
  };

  return (
    <CustomAsyncSelect
      label="Tags"
      name="tags"
      loadOptions={handleOnLoadOptions}
      isLoading={isLoading}
      isMulti
      isClearable={false}
      classNames={{
        multiValue: ({ data }: { data: ISelectedTag }) => {
          const { value } = data;
          if (value) {
            const { bgColor, textColor } = getTagColor(
              value.tagCategory.tagColor || ""
            );
            return `rounded-full ${bgColor} ${textColor} font-semibold outline-0`;
          }
          return "";
        },
      }}
      placeholder="Select tags"
    />
  );
};

export default TagSelect;
