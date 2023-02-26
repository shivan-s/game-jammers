import { useField } from "formik";
import BaseInput from "../BaseInput";
import { type ICustomFieldInput } from "./interface";

const CustomFieldInput = ({
  maxLength,
  label,
  ...props
}: ICustomFieldInput) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="flex flex-col">
        <BaseInput
          label={label}
          labelSuffix={
            maxLength ? `(${meta.value.length}/${maxLength})` : undefined
          }
          extraCSSClasses={
            meta.touched && meta.error
              ? "border-red-400 hover:border-red-500 focus:border-red-400"
              : "border-stone-900 hover:border-blue-500 focus:border-blue-600"
          }
          {...field}
          {...props}
        />
        {meta.touched && meta.error && (
          <div className="text-sm text-red-300">{meta.error}</div>
        )}
      </div>
    </>
  );
};

export default CustomFieldInput;
