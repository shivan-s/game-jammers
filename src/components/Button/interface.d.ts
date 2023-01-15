import { type MouseEventHandler, type PropsWithChildren } from "react";

interface IButton extends PropsWithChildren {
  isDanger?: boolean;
  isPrimary?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
}
