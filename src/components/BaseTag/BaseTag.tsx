import { type IBaseTag } from "./interface";

const BaseTag = ({ tagColor, tagText, isSubTag }: IBaseTag) => {
  const tagColorTable = {
    GREEN: {
      bgColor: "bg-green-300",
      textColor: "text-green-800",
      subTagBgColor: "bg-green-200",
      subTagTextColor: "text-green-700",
    },
    YELLOW: {
      bgColor: "bg-yellow-300",
      textColor: "text-yellow-800",
      subTagBgColor: "bg-yellow-200",
      subTagTextColor: "text-yellow-700",
    },
  };

  const bgColor = tagColor ? tagColorTable[tagColor].bgColor : "bg-blue-300";
  const textColor = tagColor
    ? tagColorTable[tagColor].textColor
    : "text-blue-800";

  const subTagBgColor = tagColor
    ? tagColorTable[tagColor].subTagBgColor
    : "bg-blue-200";
  const subTagTextColor = tagColor
    ? tagColorTable[tagColor].subTagTextColor
    : "text-blue-700";

  return (
    <>
      <div
        className={`w-fit rounded-full px-4 py-3 text-sm leading-none ${isSubTag
          ? `${subTagBgColor} ${subTagTextColor}`
          : `${bgColor} ${textColor}`
          }`}
      >
        <p className="font-semibold">{tagText}</p>
      </div>
    </>
  );
};
export default BaseTag;
