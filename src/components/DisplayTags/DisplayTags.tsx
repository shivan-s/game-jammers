import BaseTag from "../BaseTag";
import { type Prisma } from "@prisma/client";

type TagWithCategory = Prisma.TagGetPayload<{
  include: {
    tagCategory: true;
  };
}>;

interface IDisplayTag {
  tags: TagWithCategory[];
}

const DisplayTag = ({ tags }: IDisplayTag) => {
  const tagGroupBy = tags.reduce((acc, tag) => {
    if (!acc[tag.tagCategory.name]) {
      acc[tag.tagCategory.name] = [];
    }
    acc[tag.tagCategory.name].push({
      tagColor: tag.tagCategory.tagColor,
      tagText: tag.name,
      id: tag.id,
    });
    return acc;
  }, {});

  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(tagGroupBy).map((tagCategory) => {
        return (
          <>
            <BaseTag
              key={tagCategory}
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
