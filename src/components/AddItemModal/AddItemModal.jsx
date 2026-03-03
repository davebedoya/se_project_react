import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };
  const {
    values,
    handleChange,
    resetForm,
    errors,
    isFormSubmitted,
    validateAndSetErrors,
  } = useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    const newErrors = validateAndSetErrors(values);
    if (Object.keys(newErrors).length === 0) {
      onAddItem(values, resetForm);
    }
  }

  function handleFormClose() {
    onClose();
    resetForm();
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={handleFormClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="additem-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className={`modal__input ${
            isFormSubmitted && errors.name ? "modal__input_type_invalid" : ""
          }`}
          id="additem-name"
          placeholder="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {isFormSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="text"
          className={`modal__input ${
            isFormSubmitted && errors.imageUrl
              ? "modal__input_type_invalid"
              : ""
          }`}
          id="imageUrl"
          placeholder="Image URL"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
        />
        {isFormSubmitted && errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            value="hot"
            name="weatherType"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weatherType === "hot"}
          />
          <span className="modal__radio-text">Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            value="warm"
            name="weatherType"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weatherType === "warm"}
          />
          <span className="modal__radio-text">Warm</span>{" "}
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            value="cold"
            name="weatherType"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weatherType === "cold"}
          />
          <span className="modal__radio-text">Cold</span>
        </label>
        {isFormSubmitted && errors.weatherType && (
          <span className="modal__error modal__error_type_radio">
            {errors.weatherType}
          </span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
