import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { type Dispatch, type SetStateAction, useState } from "react";

interface ISearchInput {
  placeholder: string;
  handleSubmit: Dispatch<SetStateAction<string>>;
}

const SearchInput = ({ placeholder, handleSubmit }: ISearchInput) => {
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div className="flex">
      <div className="flex space-x-0">
        <div className="flex gap-0">
          <input
            className="justify-start rounded-l-full border-2 border-solid px-4 py-2 text-black outline-none transition ease-in-out hover:border-blue-500 focus:border-blue-600"
            placeholder={placeholder}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e.target.value);
              }
            }}
          />
          <button
            onClick={() => handleSubmit(searchInput)}
            className="rounded-r-full bg-stone-800 px-4 py-2 hover:bg-stone-700"
          >
            <BsSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
