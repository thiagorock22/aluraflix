import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };
  const [categorias, setCategorias] = useState([]);

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

  function handleSubmit(evt) {
    console.log('vc apertou  o submit');
    evt.preventDefault();

    setCategorias([
      ...categorias,
      valores,
    ]);
  }

  useEffect(() => {
    fetch('http://localhost:8080/categorias').then(async (resp) => {
      const resposta = await resp.json();
      setCategorias([
        ...resposta,
      ]);
    });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        { valores.nome }
      </h1>
      <form onSubmit={handleSubmit}>

        <FormField
          label="Nome da Categoria"
          name="nome"
          type="text"
          value={valores.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          name="descricao"
          type="textarea"
          value={valores.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          name="cor"
          type="color"
          value={valores.cor}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && <div>Loading...</div>}

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.nome}`}>
            {categoria.nome}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
