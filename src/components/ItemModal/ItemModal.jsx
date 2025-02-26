import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, deleteItem }) {
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
            <button
              className="modal__delete-button"
              type="button"
              onClick={handleDeleteItem}
            >
              Delete item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
