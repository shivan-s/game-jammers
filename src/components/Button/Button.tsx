import LoadingCircle from "../LoadingCircle";
import { type IButton } from "./interface";
// TODO: refactor with CVA
/* import { cva } from "class-variance-authority"; */
/**/
/* const button = cva( */
/*   [ */
/*     "text-bold", */
/*     "w-fit", */
/*     "items-center", */
/*     "rounded-full", */
/*     "border", */
/*     "border-white", */
/*     "px-4", */
/*     "py-2.5", */
/*     "text-sm", */
/*     "transition", */
/*     "ease-in-out", */
/*   ], */
/*   { */
/*     variants: { */
/*       intent: { */
/*         primary: {}, */
/*         danger: {}, */
/*       }, */
/*     }, */
/*   } */
/* ); */

const Button = ({
  isPrimary,
  isDanger,
  onClick,
  children,
  disabled,
  isLoading,
  type,
}: IButton) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={` text-bold w-fit items-center rounded-full border border-white px-4 py-3 text-sm leading-none transition ease-in-out ${isDanger
        ? `${isPrimary
          ? `${disabled
            ? "bg-neutral-500 text-red-700"
            : "border-red-700 bg-red-500 text-white hover:bg-red-200"
          }`
          : `${disabled
            ? "border-neutral-500 bg-inherit text-red-700"
            : "border-red-500 bg-inherit text-red-700 hover:bg-red-200 hover:text-red-500"
          }`
        }`
        : `${isPrimary
          ? `${disabled
            ? "bg-neutral-500 text-stone-700"
            : "bg-white text-stone-700 hover:bg-inherit hover:text-white"
          }`
          : `${disabled
            ? "border-neutral-500 bg-inherit text-neutral-500"
            : "bg-inherit text-white hover:bg-white hover:text-stone-700"
          }`
        }`
        }`}
    >
      <span className="flex items-center gap-2">
        {isLoading && <LoadingCircle />}
        {children}
      </span>
    </button>
  );
};

export default Button;
