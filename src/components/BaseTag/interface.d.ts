import { type TagColor } from "@prisma/client";

interface IBaseTag {
  tagText: string;
  tagColor?: TagColor;
  isSubTag?: boolean;
}
