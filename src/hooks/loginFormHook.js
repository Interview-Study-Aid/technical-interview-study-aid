import { useState } from 'react';

const useForm = callback => {
  const [values, setValues] = useState({});

  console.log(values, 'values here');

  const handleSubmit = e => {
    if(e){
      e.preventDefault();
      console.log(e, 'event')

    }
    e.target.reset();
    callback(values);
  };

  const handleInputChange = e => {
    e.persist();
    setValues(values => ({ ...values, [e.target.name]: e.target.value }));
  };

  return { handleSubmit, handleInputChange, values };
};

export default useForm;