import "./DeleteModal.css";
import closeIcon from "../../assets/modal__close-btn.svg";

function DeleteModal({ isOpen, onClose, onDelete }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_delete">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__delete_close"
        >
          <img
            src={closeIcon}
            alt="Close"
            className="modal__close-icon modal__delete_close-icon"
          />
        </button>
        <p className="modal__delete-text">
          Are you sure you want to delete this item?
          <span className="modal__delete-text-span"></span> This action is
          irreversable.
        </p>
        <button
          onClick={onDelete}
          type="button"
          className="modal__delete-modal-btn"
        >
          Yes, delete item
        </button>
        <button
          onClick={onClose}
          type="button"
          className="modal__cancel-modal-btn"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
