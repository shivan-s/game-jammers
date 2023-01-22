// TODO: work on types

import BaseTag from "../BaseTag";

const SkillLevelTag = ({ skillLevel }: ISkillLevelTag) => {
  const skills = {
    NEW: "New",
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    VETERAN: "Veteran",
    PROFESSIONAL: "Professional",
  };
  const displaySkillLevel = skillLevel ? skills[skillLevel] : "???";

  return <BaseTag tagText={displaySkillLevel} />;
};

export default SkillLevelTag;
