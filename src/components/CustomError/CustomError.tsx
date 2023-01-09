import { BiErrorAlt } from "@react-icons/all-files/bi/BiErrorAlt";

const CustomError = () => {
  return (
    <div className="align-center flex items-center justify-center">
      <div className="rounded-xl bg-red-700 px-4 py-4 text-red-100 ring-2 ring-red-100">
        <span className="flex gap-2">
          <BiErrorAlt />
          <p>Something went wrong!</p>
        </span>
      </div>
    </div>
  );
};

export default CustomError;
