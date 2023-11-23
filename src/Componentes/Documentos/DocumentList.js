import React, { useState, useEffect } from 'react';
import DocentesService from '../../Services/DocenteServices';
import { useParams, Link } from 'react-router-dom';

const ListaDocumentos = () => {
  const { id: docenteId } = useParams();
  const [documentos, setDocumentos] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const response = await DocentesService.getAllDocumentos(docenteId);
        setDocumentos(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de documentos:', error);
      }
    };

    fetchDocumentos();
  }, [docenteId]);

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    filterDocuments(searchText, filtroFecha, filtroCategoria);
  };

  const handleFechaChange = (e) => {
    const fecha = e.target.value;
    setFiltroFecha(fecha);
    filterDocuments('', fecha, filtroCategoria);
  };

  const handleCategoriaChange = (e) => {
    const categoria = e.target.value;
    setFiltroCategoria(categoria);
    filterDocuments('', filtroFecha, categoria);
  };

  const filterDocuments = (searchText, fecha, categoria) => {
    // Filtrar documentos en base a los valores actuales de searchText, fecha y categoria
    const documentosFiltrados = documentos.filter((documento) => {
      const nombreMatch = documento.nombre.toLowerCase().includes(searchText);
      const fechaMatch = !fecha || documento.fechaPublicacion.includes(fecha);
      const categoriaMatch = !categoria || categoria === '' || documento.categoria === categoria;

      return nombreMatch && fechaMatch && categoriaMatch;
    });

    setDocumentos(documentosFiltrados);
  };

  return (
    <div className='container'>
      <div className="row">
        <aside className="col-md-3">
          <div className="input-group mb-4">
            <input id="buscar" type="text" className="form-control" placeholder="Buscar documento..." onChange={handleSearchChange} />
          </div>

          <div className="mb-4">
            <label>Filtrar por Fecha:</label>
            <input type="date" onChange={handleFechaChange} />
          </div>

          <div className="mb-4">
            <label>Filtrar por Categoría:</label>
            <select onChange={handleCategoriaChange}>
              <option value="">Todas</option>
              <option value="Tecnologia">Tecnología</option>
              <option value="Ciencia">Ciencia</option>
              <option value="Arte">Arte</option>
              <option value="Historia">Historia</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
        </aside>

        <div className="col-md-9">
          <h2>Lista de Documentos</h2>
          <table id="documentosTable" className="table mb-5">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Fecha de Publicación</th>
                <th>Ver Documento</th>
              </tr>
            </thead>
            <tbody>
              {documentos.map((documento) => (
                <tr key={documento.id}>
                  <td>{documento.nombre}</td>
                  <td>{documento.categoria}</td>
                  <td>{truncateDescription(documento.descripcion, 50)}</td>
                  <td>{documento.fechaPublicacion}</td>
                  <td>
                    <Link to={`/ver-documento/${documento.id}`}>Ver</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListaDocumentos;
