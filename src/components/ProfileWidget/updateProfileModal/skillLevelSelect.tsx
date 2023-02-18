import { SkillLevel } from "@prisma/client";
import CustomSelect from "../../../components/CustomSelect";
import getTagColor from "../../../utils/tagColors";
import capitalize from "../../../utils/capitalize";

const SkillLevelSelect = () => {
  return (
    <CustomSelect
      label="Skill Level"
      name="skillLevel"
      options={Object.keys(SkillLevel).map((o: string) => ({
        value: o,
        label: capitalize(o),
      }))}
      classNames={{
        singleValue: () => {
          const { bgColor, textColor } = getTagColor("");
          return `${bgColor} ${textColor} w-fit rounded-full py-1 px-2 font-semibold`;
        },
      }}
      placeholder="Skill Level"
      isClearable={false}
      unstyled
    />
  );
};

export default SkillLevelSelect;
