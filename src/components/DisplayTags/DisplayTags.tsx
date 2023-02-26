import BaseTag from "../BaseTag";
import { type IDisplayTag, type ITags } from "./interface";

const DisplayTag = ({ tags }: IDisplayTag) => {
  const tagGroupBy = tags.reduce((acc: { [key: string]: ITags[] }, tag) => {
    if (!acc[tag.tagCategory.name]) {
      acc[tag.tagCategory.name] = [];
    }
    acc[tag.tagCategory.name]?.push({
      tagColor: tag.tagCategory.tagColor,
      tagText: tag.name,
      id: tag.id,
    });
    return acc;
  }, {});

  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(tagGroupBy).map((tagCategory, index) => {
        return (
          <>
            <BaseTag
              key={tagCategory + index.toString()}
              tagText={tagCategory}
              tagColor={tagGroupBy[tagCategory][0].tagColor}
            />
            {tagGroupBy[tagCategory].map(({ tagText, tagColor, id }) => {
              return (
                <BaseTag
                  key={id}
                  tagText={tagText}
                  tagColor={tagColor}
                  isSubTag
                />
              );
            })}
          </>
        );
      })}
    </div>
  );
};

export default DisplayTag;
