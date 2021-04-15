import React, { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleChange
  }
}

export default useForm;