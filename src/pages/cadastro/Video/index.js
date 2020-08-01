import React, { useEffect, useState } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link, useHistory } from 'react-router-dom';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm'
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';


function CadastroVideo() {

  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleChange, valores } = useForm({
    titulo: '',
    url: '',
    categoria: ''
  })

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer)=> {
        console.log(categoriasFromServer)
        setCategorias(categoriasFromServer);
      })
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de video</h1>

      <form onSubmit={(evt) => {
        evt.preventDefault();

        const categoriaEscolhida = categorias.find((categoria) => {
          return categoria.titulo === valores.categoria;
        })

        videosRepository.create({
          titulo: valores.titulo,
          url: valores.url,
          categoriaId: categoriaEscolhida.id,
        })
        .then(() => {

          history.push('/')
        })
      }}>
        <FormField
          label="Titulo do vídeo"
          name="titulo"
          type="text"
          value={valores.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          name="url"
          type="text"
          value={valores.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          name="categoria"
          type="text"
          value={valores.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <Button type="submit">
          Cadastrar
        </Button>
      </form>
      
      <Link to="/cadastro/categoria">
          Cadastrar Categoria
      </Link>
    </PageDefault>
  )
}

export default CadastroVideo;