import { type DetailUserExtraFields } from "../../server/trpc/router/users";

const SkillLevelTag = (user: DetailUserExtraFields) => {
  const skills = {
    NEW: "New",
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    VETERAN: "Veteran",
    PROFESSIONAL: "Professional",
  };
  return (
    <div className="flex gap-2">
      <div className="inline-block rounded-full bg-blue-300 px-4 py-2.5 text-xs text-blue-800">
        <p className="text-bold text-base">{skills[user.skillLevel]}</p>
      </div>
    </div>
  );
};

export default SkillLevelTag;
