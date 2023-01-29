import { type ClassNamesConfig } from "react-select";

export const CustomClassNames: ClassNamesConfig = {
  control: (
    state
  ) => `border border-solid bg-clip-border rounded transition ease-in-out hover:border-blue-500
            ${state.isFocused ? "border-blue-600" : "border-stone-900"}`,
  valueContainer: () =>
    "flex gap-1 transition ease-in-out hover:bg-stone-600 text-sm px-2 py-1",
  indicatorsContainer: () => "flex transition ease-in-out hover:bg-stone-600",
  input: () => "placeholder:text-slate-400",
  menu: () => "flex flex-col gap-2 bg-stone-700 shadow-md shadow-strong-500",
  option: () => "hover:bg-stone-600 px-2 py-1",
  multiValueLabel: () => "rounded-l-full py-1 pl-2 pr-1",
  multiValueRemove: () =>
    "rounded-r-full hover:text-red-700 hover:bg-red-300 py-1 pr-2 pl-1",
  placeholder: () => "text-slate-400",
};
