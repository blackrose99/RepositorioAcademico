import React, { useState, useEffect } from 'react';
import DocentesService from '../../Services/DocenteServices';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderDocente from '../Docentes/HeaderDocente';

const EditarDocumento = () => {
  const { docenteId, documentoId } = useParams();
  const navigate = useNavigate();

  const [documentoData, setDocumentoData] = useState({
    nombre: '',
    categoria: '',
    autor: '',
    descripcion: '',
    fechaPublicacion: 0, // Ajusta esto según el tipo de dato
    archivo: '',
  });

  useEffect(() => {
    const fetchDocumento = async () => {
      try {
        const response = await DocentesService.getDocumentById(documentoId);
        const documento = response.data;

        // Actualizar el estado con los datos del documento existente
        setDocumentoData({
          nombre: documento.nombre,
          categoria: documento.categoria,
          autor: documento.autor,
          descripcion: documento.descripcion,
          fechaPublicacion: documento.fechaPublicacion,
          archivo: documento.archivo,
        });
      } catch (error) {
        console.error('Error al obtener el documento para editar:', error);
      }
    };

    fetchDocumento();
  }, [documentoId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        setDocumentoData((prevData) => ({
          ...prevData,
          archivo: reader.result.split(',')[1],
        }));
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Valores antes de la llamada a la API:', documentoData);

    try {
      // Llama al servicio para editar el documento
      const response = await DocentesService.editDocumento(documentoId, documentoData);

      console.log('Respuesta del servidor:', response.data);

      // Redirige a la ruta deseada
      navigate(`/docentes/${docenteId}`);
    } catch (error) {
      console.error('Error al enviar el formulario de edición:', error);
    }
  };
  const handleInputChange = (e) => {
    setDocumentoData({
      ...documentoData,
      [e.target.name]: e.target.value,
    });
  };
  
  // Cambiado a handleTextareaChange para manejar cambios en el textarea
  const handleTextareaChange = (e) => {
    setDocumentoData({
      ...documentoData,
      descripcion: e.target.value,
    });
  };

  return (
    <div className='container'>
      <HeaderDocente />
      <h2>Editar Documento</h2>
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
<textarea name="descripcion" value={documentoData.descripcion} onChange={handleTextareaChange} required />


        <label>Año de Publicación:</label>
        <input type="text" name="fechaPublicacion" value={documentoData.fechaPublicacion} onChange={handleInputChange} required />

        <label>Archivo:</label>
        <input type="file" onChange={handleFileChange} />

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarDocumento;
