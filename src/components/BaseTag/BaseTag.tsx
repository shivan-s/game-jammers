import getTagColor from "../../utils/tagColors";
import { type IBaseTag } from "./interface";

const BaseTag = ({ tagColor, tagText, isSubTag }: IBaseTag) => {
  const tagColors = getTagColor(tagColor);
  const bgColor = tagColors.bgColor;
  const textColor = tagColors.textColor;
  const subTagBgColor = tagColors.subTagBgColor;
  const subTagTextColor = tagColors.subTagTextColor;

  return (
    <>
      <div
        className={`w-fit rounded-full px-4 py-3 text-sm leading-none ${
          isSubTag
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
