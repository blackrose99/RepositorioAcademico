import React, { useState } from 'react';
import DocentesService from '../../Services/DocenteServices';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderDocente from '../Docentes/HeaderDocente';
import "./DocumentosAdd.css";

const CrearDocumento = () => {
  const { id: docenteId } = useParams();
  const navigate = useNavigate();

  const [documentoData, setDocumentoData] = useState({
    nombre: '',
    categoria: '',
    autor: '',
    descripcion: '',
    fechaPublicacion: new Date().getFullYear().toString(),
    archivo: '',
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setDocumentoData((prevData) => ({
        ...prevData,
        archivo: reader.result.split(',')[1],
      }));
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

  const handleBase64Generation = () => {
    try {
      // Obtener el contenido base64 del archivo
      const base64String = documentoData.archivo;

      // Mostrar la cadena base64 en el área de texto
      document.getElementById('base64ofFile').value = base64String;
    } catch (error) {
      console.error('Error al generar la cadena base64:', error);
    }
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
      const response = await DocentesService.createDocumento(documentoDataToSend);

      console.log('Respuesta del servidor:', response.data);

      // Redirige a la ruta deseada
      navigate(`/docentes/${docenteId}`);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };
  return (
    <div>
    <HeaderDocente />
    <div className='container'>
 
      <h2>Crear Nuevo Documento</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre del Documento:</label>
        <input type="text" name="nombre" value={documentoData.nombre} onChange={handleInputChange} required />

        <label>Categoría del Documento:</label>
        <select name="categoria" value={documentoData.categoria} onChange={handleInputChange} required>
          <option value="">Selecciona una categoría</option>
          <option value="Tecnologia">Tecnología</option>
          <option value="Ciencia">Ciencia</option>
          <option value="Arte">Arte</option>
          <option value="Historia">Historia</option>
          <option value="Otros">Otros</option>
        </select>

        <label>Autor del Documento:</label>
        <input type="text" name="autor" value={documentoData.autor} onChange={handleInputChange} required />

        <label>Descripción del Documento:</label>
        <textarea name="descripcion" value={documentoData.descripcion} onChange={handleInputChange} required />

        <label>Año de Publicación:</label>
        <input type="text" name="fechaPublicacion" value={documentoData.fechaPublicacion} onChange={handleInputChange} required />

        <label>Archivo:</label>
        <input type="file" onChange={handleFileChange} />

        <button type="submit">Crear Documento</button>
      </form>
    </div>
    </div>
  );
};

export default CrearDocumento;
