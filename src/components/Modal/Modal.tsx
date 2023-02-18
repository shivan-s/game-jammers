import { type IModal } from "./interface";

const Modal = ({
  showModal,
  setShowModal,
  exitOnOutsideClick = true,
  children,
}: IModal) => {
  const handleOnClick = () => {
    if (exitOnOutsideClick) {
      setShowModal(false);
    }
  };

  if (!showModal) {
    return null;
  }
  return (
    <>
      <div
        className="absolute inset-0 z-20 h-full w-full backdrop-blur-lg"
        onClick={handleOnClick}
      ></div>
      <div className="absolute inset-0 z-30 mx-auto mt-20 flex h-fit w-fit flex-col justify-around gap-2 rounded-xl shadow-lg shadow-stone-600">
        {children}
      </div>
    </>
  );
};

export default Modal;
