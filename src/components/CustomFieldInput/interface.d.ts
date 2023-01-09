import { type InputHTMLAttributes } from "react";

interface ICustomFieldInput extends InputHTMLAttributes<HTMLInputElement> {
  component?: "input" | "textarea";
  maxLength?: number;
  name: string;
  label: string;
}
