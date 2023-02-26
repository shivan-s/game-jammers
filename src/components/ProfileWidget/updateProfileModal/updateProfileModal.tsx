import { useState } from "react";
import Button from "../../Button";
import Modal from "../../Modal";
import UpdateProfile from "./updateProfile";

const UpdateProfileModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleOnClick = () => {
    setShowModal(true);
  };
  return (
    <>
      <Button isPrimary onClick={handleOnClick}>
        Edit Profile
      </Button>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        exitOnOutsideClick={false}
      >
        <UpdateProfile setShowModal={setShowModal} />
      </Modal>
    </>
  );
};

export default UpdateProfileModal;
