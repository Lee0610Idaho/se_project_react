import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen = true, onClose, handleEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const [newData, setNewData] = useState({
    name: currentUser.name,
    avatar: currentUser.avatar,
  });

  // Change function
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setNewData({ ...newData, [name]: value });
    console.log(name, value);
  };

  // Submit function
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const updatedData = {
      name: newData.name || currentUser.name,
      avatar: newData.avatar || currentUser.avatar,
    };

    console.log(updatedData);
    handleEditProfile(updatedData);
  };

  return (
    <ModalWithForm
      buttonText="Save Changes"
      onClose={onClose}
      title="Change Profile Data"
      onSubmit={handleSubmit}
    >
      <div className="form__input">
        <label>
          Name*
          <input
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            value={newData.name}
            className="form__text-input"
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form__input">
        <label>
          Avatar*
          <input
            type="url"
            name="avatar"
            minLength="1"
            value={newData.avatar}
            className="form__text-input"
            onChange={handleChange}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
