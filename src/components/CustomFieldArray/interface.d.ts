import { type InputHTMLAttributes } from "react";

interface ICustomFieldArray extends InputHTMLAttributes<HTMLInputElement> {
  component?: "input" | "textarea";
  maxLength?: number;
  name: string;
  label: string;
}
