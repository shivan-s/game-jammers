import { useFormikContext } from "formik";
import { type ChangeEventHandler, type MouseEventHandler, useRef } from "react";
import { FiUpload } from "@react-icons/all-files/fi/FiUpload";
import { type IImageUpload } from "./interface";

const ImageUpload = ({ image, setImage, imageClassName }: IImageUpload) => {
  const name = "image";
  const hiddenFileInput = useRef(null);

  const { setFieldValue, values } = useFormikContext();

  const handleOnClick: MouseEventHandler<HTMLDivElement> = () => {
    hiddenFileInput.current.click();
  };

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.files) {
      const newImage = e.currentTarget.files[0] as File;
      setFieldValue(name, newImage);
      setImage({ data: newImage, url: URL.createObjectURL(newImage) });
    }
  };

  return (
    <label className="h-fit w-fit">
      <strong>Avatar</strong>
      <div className="relative h-fit w-fit" onClick={handleOnClick}>
        <img
          className={imageClassName}
          /* TODO: add placeholder  */
          src={image ? image.url : values.image.url || ""}
          alt="avatar"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-3xl text-white opacity-30 transition ease-in-out hover:opacity-60">
          <div className="z-10 h-fit w-fit rounded-full bg-black p-6">
            <FiUpload />
          </div>
        </div>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleOnChange}
          hidden
        />
      </div>
    </label>
  );
};

export default ImageUpload;
