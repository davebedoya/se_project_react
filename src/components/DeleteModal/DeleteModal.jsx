import "./DeleteModal.css";

function DeleteModal({ isOpen, onClose, onDelete }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_delete">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__image_close"
        ></button>
        <p className="modal__content_type_delete-text">
          Are you sure you want to delete this item? <span></span> This action
          is irreversable.
        </p>
        <button
          onClick={onDelete}
          type="button"
          className="modal__caption_delete-modal-btn"
        >
          Yes, delete item
        </button>
        <button
          onClick={onClose}
          type="button"
          className="modal__caption_cancel-delete-modal-btn"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
