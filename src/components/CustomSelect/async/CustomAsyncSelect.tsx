import { useField, useFormikContext } from "formik";
import AsyncSelect from "react-select/async";
import { CustomClassNames } from "../baseSelect";
import { type ICustomAsyncSelect, type Option } from "./interface";

const CustomAsyncSelect = ({
  label,
  extraComponents,
  classNames,
  ...props
}: ICustomAsyncSelect) => {
  const [field] = useField(props);
  const { setFieldValue } = useFormikContext();
  const { name } = props;

  const handleOnChange = (value: Option<any> | Option<any>[]) => {
    setFieldValue(name, value);
  };

  return (
    <label>
      <strong>{label}</strong>
      <AsyncSelect
        {...props}
        {...field}
        classNames={{
          ...CustomClassNames,
          ...classNames,
        }}
        onChange={handleOnChange}
        components={{ ...extraComponents }}
        defaultOptions
        cacheOptions
        unstyled
      />
    </label>
  );
};

export default CustomAsyncSelect;
