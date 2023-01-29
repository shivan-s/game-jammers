import Select from "react-select/";
import { type ICustomSelect, type Option } from "./interface";
import { CustomClassNames } from "./baseSelect";
import { useField, useFormikContext } from "formik";

const CustomSelect = ({
  label,
  extraComponents,
  classNames,
  ...props
}: ICustomSelect) => {
  const [field] = useField(props);
  const { setFieldValue } = useFormikContext();
  const { name } = props;

  const handleOnChange = (value: Option<any> | Option<any>[]) => {
    setFieldValue(name, value);
  };

  return (
    <label>
      <strong>{label}</strong>
      <Select
        {...props}
        {...field}
        classNames={{ ...CustomClassNames, ...classNames }}
        onChange={handleOnChange}
        components={{ ...extraComponents }}
        unstyled
      />
    </label>
  );
};

export default CustomSelect;
