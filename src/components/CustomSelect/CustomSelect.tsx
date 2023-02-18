import Select from "react-select";
import { type ICustomSelect, type Option } from "./interface";
import { CustomClassNames } from "./baseSelect";
import { useField, useFormikContext } from "formik";

const CustomSelect = ({
  label,
  extraComponents,
  classNames,
  ...props
}: ICustomSelect) => {
  const { name } = props;
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleOnChange = (value: Option<any> | Option<any>[]) => {
    setFieldValue(name, value);
  };
  return (
    <>
      <label>
        <strong>{label}</strong>
        <Select
          {...props}
          {...field}
          defaultValue={meta.value}
          classNames={{ ...CustomClassNames(meta), ...classNames }}
          onChange={handleOnChange}
          components={{ ...extraComponents }}
          unstyled
        />
      </label>
      {meta.touched && meta.error && (
        <div className="text-sm text-red-300">{meta.error}</div>
      )}
    </>
  );
};

export default CustomSelect;
