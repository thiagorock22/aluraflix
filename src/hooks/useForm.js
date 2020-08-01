import { useState } from 'react';

function useForm(valoresIniciais) {
    const [valores, setValues] = useState(valoresIniciais);
    function setValue(chave, valor) {
      setValues({
        ...valores,
        [chave]: valor,
      });
    }
  
  
    function handleChange(evt) {
      const { value } = evt.target;
      setValue(
        evt.target.getAttribute('name'),
        value,
      );
    }
  
    function clearForm() {
      setValues(valoresIniciais);
    }
  
    return {
      valores,
      handleChange,
      clearForm
    }
  }

  export default useForm;