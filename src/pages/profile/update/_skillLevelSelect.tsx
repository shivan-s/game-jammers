import { SkillLevel } from "@prisma/client";
import CustomSelect from "../../../components/CustomSelect";
import getTagColor from "../../../utils/tagColors";

const SkillLevelSelect = () => {
  return (
    <CustomSelect
      label="Skill Level"
      name="skillLevel"
      options={Object.keys(SkillLevel).map((o) => ({
        value: o,
        label: o.charAt(0).toUpperCase() + o.slice(1),
      }))}
      classNames={{
        singleValue: () => {
          const { bgColor, textColor } = getTagColor("");
          return `rounded-full ${bgColor} ${textColor} py-1 px-2 font-semibold`;
        },
      }}
      placeholder="Skill Level"
      isClearable={false}
      isSearchable
      unstyled
    />
  );
};

export default SkillLevelSelect;
