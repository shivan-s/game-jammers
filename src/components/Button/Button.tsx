import { type IButton } from "./interface";

const Button = ({ isPrimary, onClick, children, disabled, type }: IButton) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`w-fit items-center rounded-full border border-white ${isPrimary
          ? `bg-white text-stone-700 hover:bg-inherit hover:text-white`
          : `bg-inherit text-white hover:bg-white hover:text-stone-700`
        } text-bold px-4 py-2.5 text-sm`}
    >
      <span className="flex items-center gap-2">{children}</span>
    </button>
  );
};

export default Button;
