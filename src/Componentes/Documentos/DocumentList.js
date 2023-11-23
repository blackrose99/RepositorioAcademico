import React, { useState, useEffect } from 'react';
import DocentesService from '../../Services/DocenteServices';
import { useParams, Link } from 'react-router-dom';

const ListaDocumentos = () => {
  const { id: docenteId } = useParams();
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    // Llama al servicio para obtener la lista de documentos del docente
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

  return (
    <div className='container'>
      <h2>Lista de Documentos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Fecha de Publicación</th>
            <th>Ver Documento</th>
            {/* Agrega más encabezados según sea necesario */}
          </tr>
        </thead>
        <tbody>
          {documentos.map((documento) => (
            <tr key={documento.id}>
              <td>{documento.nombre}</td>
              <td>{documento.categoria}</td>
              <td>{documento.descripcion}</td>
              <td>{documento.fechaPublicacion}</td>
              <td>
                <Link to={`/ver-documento/${documento.id}`}>Ver</Link>
              </td>
              {/* Agrega más celdas según sea necesario */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaDocumentos;
