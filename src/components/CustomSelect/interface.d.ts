import type StateManagedSelect from "react-select/dist/declarations/src/stateManager";

interface Option<T> {
  label: string;
  value: T;
}

interface GroupedOption<T> {
  label: string;
  options: Option<T>[];
}

interface ICustomSelect
  extends Omit<
    StateManagedSelect<Option, false | true, GroupedOption>,
    "value" | "onChange"
  > {
  name: string;
}
