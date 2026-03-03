import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const defaultValues = {
    name: "",
    avatar: "",
    email: "",
    password: "",
  };

  const {
    values,
    handleChange,
    resetForm,
    // errors,
    // isFormSubmitted,
    // validateAndSetErrors,
  } = useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    // const newErrors = validateAndSetErrors(values);
    // console.log("register errors:", newErrors);

    // if (Object.keys(newErrors).length === 0) {
    //   onRegister(values, resetForm);
    // }

    if (!values.name || !values.email || !values.password) return;

    onRegister(values, resetForm);
  }

  function handleFormClose() {
    onClose();
    resetForm();
  }
  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      onClose={handleFormClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          type="text"
          // className={`modal__input ${
          //   isFormSubmitted && errors.name ? "modal__input_type_invalid" : ""
          // }`}
          className="modal__input"
          id="register-name"
          placeholder="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
        {/* {isFormSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )} */}
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar
        <input
          type="url"
          // className={`modal__input ${
          //   isFormSubmitted && errors.avatar ? "modal__input_type_invalid" : ""
          // }`}
          className="modal__input"
          id="register-avatar"
          placeholder="Avatar URL"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
        />
        {/* {isFormSubmitted && errors.avatar && (
          <span className="modal__error">{errors.avatar}</span>
        )} */}
      </label>
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          type="email"
          // className={`modal__input ${
          //   isFormSubmitted && errors.email ? "modal__input_type_invalid" : ""
          // }`}
          className="modal__input"
          id="register-email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
        {/* {isFormSubmitted && errors.email && (
          <span className="modal__error">{errors.email}</span>
        )} */}
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          type="password"
          // className={`modal__input ${
          //   isFormSubmitted && errors.password
          //     ? "modal__input_type_invalid"
          //     : ""
          // }`}
          className="modal__input"
          id="register-password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
        />
        {/* {isFormSubmitted && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )} */}
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
