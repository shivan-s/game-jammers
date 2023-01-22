import { type IBaseTextArea } from "./interface";

const BaseTextArea = ({
  extraCSSClasses,
  label,
  labelSuffix,
  ...props
}: IBaseTextArea) => {
  return (
    <label>
      <strong>{label}</strong> {labelSuffix}
      <textarea
        className={`m-0 block w-full rounded border border-solid bg-stone-700 bg-clip-border px-4 py-2 ${
          !props.disabled &&
          "transition ease-in-out hover:bg-stone-600 focus:outline-none"
        } ${extraCSSClasses}`}
        {...props}
      />
    </label>
  );
};

export default BaseTextArea;
