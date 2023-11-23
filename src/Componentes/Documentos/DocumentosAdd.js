import React, { useState, useEffect } from 'react';
import DocentesService from '../../Services/DocenteServices';
import { useParams } from 'react-router-dom';

const CrearDocumento = () => {
  const { id: docenteId } = useParams(); // Obtén el ID del docente desde los parámetros de la URL

  const [documentoData, setDocumentoData] = useState({
    nombre: '',
    categoria: '',
    autor: '',
    descripcion: '',
    fechaPublicacion: '',
    archivoBase64: '',
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setDocumentoData({
        ...documentoData,
        archivoBase64: base64String,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setDocumentoData({
      ...documentoData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Valores antes de la llamada a la API:', documentoData);

    try {
      const documentoDataToSend = {
        ...documentoData,
        docentes: [{ id: docenteId }],
      };

      // Llama al servicio para crear el documento
      const response = await DocentesService.createDocente(documentoDataToSend);

      console.log('Respuesta del servidor:', response.data);
      // Puedes redirigir o realizar otras acciones después de crear el documento
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Documento</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre del Documento:</label>
        <input type="text" name="nombre" value={documentoData.nombre} onChange={handleInputChange} required />

        <label>Categoría del Documento:</label>
        <input type="text" name="categoria" value={documentoData.categoria} onChange={handleInputChange} required />

        <label>Autor del Documento:</label>
        <input type="text" name="autor" value={documentoData.autor} onChange={handleInputChange} required />

        <label>Descripción del Documento:</label>
        <textarea name="descripcion" value={documentoData.descripcion} onChange={handleInputChange} required />

        <label>Fecha de Publicación:</label>
        <input type="datetime-local" name="fechaPublicacion" value={documentoData.fechaPublicacion} onChange={handleInputChange} required />

        <label>Archivo:</label>
        <input type="file" onChange={handleFileChange} />

        <button type="submit">Crear Documento</button>
      </form>
    </div>
  );
};

export default CrearDocumento;
