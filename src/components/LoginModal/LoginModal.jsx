import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, resetForm, errors } =
    useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log("LoginModal hadleSubmit Fired");
    // const newErrors = validateAndSetErrors(values);
    // if (Object.keys(newErrors).length === 0) {

    // }

    if (!values.email || !values.password) return;

    onLogin(values, resetForm);
  }

  function handleFormClose() {
    onClose();
    resetForm();
  }
  return (
    <ModalWithForm
      title="Login"
      buttonText="Log in"
      onClose={handleFormClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          // className={`modal__input ${
          //   isFormSubmitted && errors.email ? "modal__input_type_invalid" : ""
          // }`}
          className="modal__input"
          id="email"
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
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          // className={`modal__input ${
          //   isFormSubmitted && errors.password
          //     ? "modal__input_type_invalid"
          //     : ""
          // }`}
          className="modal__input"
          id="password"
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

export default LoginModal;
