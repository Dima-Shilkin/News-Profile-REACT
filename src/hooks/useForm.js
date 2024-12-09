import { useState } from "react";

export const useForm = (initialValues, validate) => {
  const [formData, setFormData] = useState(initialValues);
  const [formError, setFormError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (formError) {
      setFormError(false);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlerBlur = () => {
    setFormError(false);
  };

  const resetForm = () => {
    setFormData(initialValues);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    const errorMessage = validate(formData);

    if (errorMessage) {
      setFormError(true);
      return;
    }

    resetForm();
  };

  return {
    formData,
    formError,
    handleChange,
    handlerBlur,
    resetForm,
    handlerSubmit,
  };
};
