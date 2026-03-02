import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const defaultValues = {
    name: "",
    avatar: "",
  };

  const {
    values,
    handleChange,
    resetForm,
    errors,
    isFormSubmitted,
    validateAndSetErrors,
    setValues,
  } = useFormWithValidation(defaultValues, true);

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();

    console.log("EditProfileModal handleSubmit fired", values);

    // Let HTML validation handle the required name + url format.
    // If we get here, call App handler which will PATCH /users/me,
    // then update state + close the modal on success.
    onUpdateUser(
      {
        name: values.name,
        avatar: values.avatar,
      },
      resetForm,
    );
  }

  function handleFormClose() {
    onClose();
    resetForm();
  }

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      onClose={handleFormClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name*
        <input
          type="text"
          required
          className={`modal__input ${
            isFormSubmitted && errors.name ? "modal__input_type_invalid" : ""
          }`}
          id="name"
          placeholder="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {isFormSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar
        <input
          type="url"
          className={`modal__input ${
            isFormSubmitted && errors.avatar ? "modal__input_type_invalid" : ""
          }`}
          id="avatar"
          placeholder="Avatar URL"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
        />
        {isFormSubmitted && errors.avatar && (
          <span className="modal__error">{errors.avatar}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
