import React, { useState, useEffect } from 'react';
import DocentesService from '../../Services/DocenteServices';
import { useParams } from 'react-router-dom';

const DetalleDocumento = () => {
  const { documentoId } = useParams();
  const [documento, setDocumento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocumentoById = async () => {
      try {
        const response = await DocentesService.getDocumentoById(documentoId);
        setDocumento(response.data);
      } catch (error) {
        console.error('Error al obtener la información del documento:', error);
  
        if (error.response) {
          console.log('Respuesta completa del servidor:', error.response);
          setError('Error en la respuesta del servidor');
        } else if (error.request) {
          console.log('No se recibió respuesta del servidor');
          setError('No se recibió respuesta del servidor');
        } else {
          console.log('Error en la configuración de la solicitud', error.message);
          setError('Error en la configuración de la solicitud');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchDocumentoById();
  }, [documentoId]);
  

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!documento) {
    return <p>No se encontró el documento.</p>;
  }

  return (
    <div className='container'>
      <h2>Detalle del Documento</h2>
      <p><strong>Nombre:</strong> {documento.nombre}</p>
      <p><strong>Categoría:</strong> {documento.categoria}</p>
      <p><strong>Autor:</strong> {documento.autor}</p>
      <p><strong>Descripción:</strong> {documento.descripcion}</p>
      <p><strong>Fecha de Publicación:</strong> {documento.fechaPublicacion}</p>
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
};

export default DetalleDocumento;
