import { FiUpload } from "@react-icons/all-files/fi/FiUpload";
import Image, { type ImageProps } from "next/image";
import {
  type ReactElement,
  useState,
  type MouseEventHandler,
  type ChangeEventHandler,
  useRef,
  type SetStateAction,
  type Dispatch,
} from "react";
import Button from "../../components/Button";

interface IAvatar extends ImageProps {
  label: string;
}

const ImageUploadModal = ({
  showModal,
  setShowModal,
  imageClassName,
  currentImage,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  imageClassName?: string;
  currentImage?: ReactElement;
}) => {
  const [newImage, setNewImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = () => {
    hiddenFileInput.current.click();
  };

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newImage = e.currentTarget.files[0];
    setNewImage(URL.createObjectURL(newImage));
  };

  const handleOnClickCancel: MouseEventHandler<HTMLButtonElement> = () => {
    setNewImage(null);
    setShowModal(false);
  };

  if (!showModal) {
    return null;
  }

  return (
    <>
      <div
        className="absolute inset-0 z-20 h-full w-full backdrop-blur-sm"
        onClick={() => setShowModal(false)}
      ></div>
      <div className="absolute inset-0 z-30 mx-auto mt-20 flex h-fit w-1/2 flex-col justify-around gap-2 rounded-xl bg-stone-700 p-4 shadow-md shadow-stone-600">
        <h3 className="text-xl">Upload Avatar</h3>
        <label>
          <strong>Current Image</strong>
          {currentImage}
        </label>
        <div className="flex flex-wrap gap-1">
          <Button type="button" isPrimary onClick={handleOnClick}>
            <span className="flex gap-2">
              <FiUpload />
              <p>Upload {newImage && "Another"}</p>
            </span>
          </Button>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleOnChange}
            hidden
          />
          <Button type="button" onClick={handleOnClickCancel}>
            Cancel
          </Button>
        </div>
        {newImage && (
          <>
            <label>
              <strong>New Image</strong>
              <img className={imageClassName} src={newImage} alt="New avatar" />
            </label>
            <Button isPrimary>Confirm</Button>
          </>
        )}
      </div>
    </>
  );
};

const ImageUpload = ({ label, alt, src, className, ...props }: IAvatar) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const image = (
    <Image className={`${className}`} alt={alt} src={src} {...props} />
  );
  return (
    <>
      <label className="h-fit w-fit">
        <strong>{label}</strong>
        <div className="relative" onClick={() => setShowModal(true)}>
          <>
            {image}
            <div className="absolute inset-0 z-10 flex items-center justify-center text-3xl text-white opacity-0 transition ease-in-out hover:opacity-100">
              <FiUpload />
            </div>
          </>
        </div>
      </label>
      <ImageUploadModal
        imageClassName={className}
        currentImage={image}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default ImageUpload;
