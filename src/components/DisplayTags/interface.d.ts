import { type TagColor, type Prisma } from "@prisma/client";

type TagWithCategory = Prisma.TagGetPayload<{
  include: {
    tagCategory: true;
  };
}>;

interface IDisplayTag {
  tags: TagWithCategory[];
}

interface ITags {
  tagColor: TagColor;
  tagText: string;
  id: string;
}
