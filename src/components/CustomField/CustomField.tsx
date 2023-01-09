import { useField } from "formik";
import { type ICustomField } from "./interface";

const CustomField = ({
  component,
  maxLength,
  label,
  ...props
}: ICustomField) => {
  const [field, meta] = useField(props);
  const Component = component || "input";
  return (
    <>
      <label>
        <strong>{label}</strong>{" "}
        {maxLength && `(${meta.value.length}/${maxLength})`}
        <Component
          className={`m-0 block w-full rounded border border-solid bg-stone-700 bg-clip-border px-4 py-2 transition ease-in-out  hover:bg-stone-600 focus:outline-none ${
            meta.touched && meta.error
              ? "border-red-400 hover:border-red-500 focus:border-red-400"
              : "border-stone-900 hover:border-blue-500 focus:border-blue-600"
          }`}
          {...field}
          {...props}
        />
        {meta.touched && meta.error && (
          <div className="text-sm text-red-300">{meta.error}</div>
        )}
      </label>
    </>
  );
};

export default CustomField;
