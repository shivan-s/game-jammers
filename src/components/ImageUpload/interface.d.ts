import { type Dispatch, type SetStateAction } from "react";

interface IImageUpload {
  imageClassName?: string;
  image?: IImage | null;
  setImage: Dispatch<SetStateAction<IImage | null>>;
}

export interface IImage {
  data: Blob | MediaSource | File;
  url: string;
}
