import { type PropsWithChildren } from "react";

const Box = ({ children }: PropsWithChildren) => {
  return (
    <div className="mx-auto flex flex-col gap-2 rounded-xl bg-stone-700 p-4">
      {children}
    </div>
  );
};

export default Box;
