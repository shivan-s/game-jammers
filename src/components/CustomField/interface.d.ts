import { type TextareaHTMLAttributes, type InputHTMLAttributes } from "react";

interface ICustomField
  extends Omit<
    | InputHTMLAttributes<HTMLInputElement>
    | TextareaHTMLAttributes<HTMLTextAreaElement>,
    "rows",
    "cols",
    "textLength"
  > {
  component?: "input" | "textarea";
  name: string;
  rows?: number;
  cols?: number;
  textLength?: number;
  maxLength?: number;
  label: string;
}
