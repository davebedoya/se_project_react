import "./ItemModal.css";
import modalImageCloseIcon from "../../assets/modal__image_close-btn.svg";

import DeleteModal from "../DeleteModal/DeleteModal";

function ItemModal({
  isOpen,
  onClose,
  card,
  handleDeleteClick,
  activeModal,
  onDelete,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__image_close"
        >
          <img
            src={modalImageCloseIcon}
            alt="Close"
            className="modal__close-icon modal__image_close-icon"
          />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__caption_containter">
            <h2 className="modal__caption">{card.name}</h2>
            <button
              onClick={handleDeleteClick}
              type="button"
              className="modal__caption_delete-modal-btn"
            >
              Delete Item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>

      <DeleteModal
        isOpen={activeModal === "delete"}
        onClose={onClose}
        onDelete={onDelete}
      />
    </div>
  );
}

export default ItemModal;
