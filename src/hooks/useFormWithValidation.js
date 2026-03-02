import { useState } from "react";

export function useFormWithValidation(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  function validateForm(formValues) {
    const newErrors = {};

    // Validate name
    if (!formValues.name || formValues.name.trim() === "") {
      newErrors.name = "Name is required";
    } else if (formValues.name.length < 1) {
      newErrors.name = "Name must be at least 1 character";
    } else if (formValues.name.length > 30) {
      newErrors.name = "Name must be no more than 30 characters";
    }

    // Validate imageUrl
    if (!formValues.imageUrl || formValues.imageUrl.trim() === "") {
      newErrors.imageUrl = "Image URL is required";
    } else {
      try {
        new URL(formValues.imageUrl);
      } catch {
        newErrors.imageUrl = "Please enter a valid URL";
      }
    }

    // Validate weatherType
    if (!formValues.weatherType) {
      newErrors.weatherType = "Please select a weather type";
    }

    return newErrors;
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);

    // Always validate in real-time after form submission
    if (isFormSubmitted) {
      const newErrors = validateForm(updatedValues);
      setErrors(newErrors);
    }
  }

  function resetForm() {
    setValues(defaultValues);
    setErrors({});
    setIsFormSubmitted(false);
  }

  function isValid() {
    return Object.keys(errors).length === 0;
  }

  function validateAndSetErrors(formValues) {
    const newErrors = validateForm(formValues);
    setErrors(newErrors);
    setIsFormSubmitted(true);
    return newErrors;
  }

  return {
    values,
    setValues,
    handleChange,
    resetForm,
    errors,
    isFormSubmitted,
    isValid: isValid(),
    validateAndSetErrors,
  };
}
