import { type TextareaHTMLAttributes } from "react";

interface IBaseTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  extraCSSClasses?: string;
  label?: string;
  labelSuffix?: string;
}
