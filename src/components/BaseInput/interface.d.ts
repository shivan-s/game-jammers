import { type InputHTMLAttributes } from "react";

interface IBaseInput extends InputHTMLAttributes<HTMLInputElement> {
  extraCSSClasses?: string;
  label?: string;
  labelSuffix?: string;
}
