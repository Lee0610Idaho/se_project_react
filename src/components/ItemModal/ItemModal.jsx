import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, deleteItem }) {
  const currentUser = useContext(CurrentUserContext);

  // Checking if the current user is the owner of the current clothing item
  const isOwn = card.owner === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__delete-button modal__delete-button_visible ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;

  const handleDeleteItem = () => {
    deleteItem(card._id);
  };

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_image"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer_row_initial-row">
            <h2 className="modal__caption">{card.name}</h2>
            {isOwn && (
              <button
                className={itemDeleteButtonClassName}
                type="button"
                onClick={handleDeleteItem}
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
