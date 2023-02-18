import { type TagWithInclude } from "../../../server/trpc/router/tags";
import { type Dispatch, type SetStateAction } from "react";

interface ISelectedTag {
  value: TagWithInclude;
  label: string;
}

interface IUpdateProfile {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}
