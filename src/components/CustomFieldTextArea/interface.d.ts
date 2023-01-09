import { type TextareaHTMLAttributes } from "react";

interface ICustomFieldTextArea
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  maxLength: number;
  label: string;
}
