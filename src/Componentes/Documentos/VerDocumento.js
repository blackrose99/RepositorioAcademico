import React, { useState, useEffect } from 'react';
import DocentesService from '../../Services/DocenteServices';
import { useParams } from 'react-router-dom';

function base64ToFile(base64String, fileName) {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/pdf' });
  const file = new File([blob], fileName, { type: 'application/pdf' });
  return file;
}

const VerDocumento = () => {
  const { id: documentoId } = useParams();
  const [documento, setDocumento] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocumento = async () => {
      try {
        const response = await DocentesService.getDocumentById(documentoId);
        setDocumento(response.data);
      } catch (error) {
        console.error('Error al obtener el documento:', error);
        setError(error);
      }
    };

    fetchDocumento();
  }, [documentoId]);

  const handleDownload = async () => {
    if (documento && documento.archivo) {
      try {
        const file = base64ToFile(documento.archivo, documento.nombre || 'archivo');
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error al decodificar y descargar el archivo:', error);
      }
    }
  };

  if (error) {
    return <div>Error al obtener el documento: {error.message}</div>;
  }

  if (!documento) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='container'>
      <h2>Detalles del Documento</h2>
      <div>
        <strong>Nombre:</strong> {documento.nombre}
      </div>
      <div>
        <strong>Categoría:</strong> {documento.categoria}
      </div>
      <div>
        <strong>Autor:</strong> {documento.autor}
      </div>
      <div>
        <strong>Descripción:</strong> {documento.descripcion}
      </div>
      <div>
        <strong>Fecha de Publicación:</strong> {documento.fechaPublicacion}
      </div>
      <div>
        <strong>Docentes:</strong> {documento.docentes.map(docente => docente.primerNombre + ' ' + docente.primerApellido).join(', ')}
      </div>
      <div>
        <button onClick={handleDownload}>Descargar Archivo</button>
      </div>
    </div>
  );
};

export default VerDocumento;
