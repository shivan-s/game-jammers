import { type PropsWithChildren } from "react";

interface IModal extends PropsWithChildren {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  exitOnOutsideClick?: boolean;
}
