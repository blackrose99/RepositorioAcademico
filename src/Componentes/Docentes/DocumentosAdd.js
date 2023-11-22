import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DocentesService from '../../Services/DocenteServices';

const CrearDocumento = () => {
    const { id } = useParams();
  
    // Estados para los datos del documento y el archivo
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [autor, setAutor] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaPublicacion, setFechaPublicacion] = useState('');
    const [archivo, setArchivo] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Convierte la fecha a un formato compatible con el servidor (puedes ajustar esto según tu necesidad)
        const fechaFormateada = new Date(fechaPublicacion).toISOString();
  
        // Lee el contenido del archivo como un array de bytes
        const archivoBinario = await leerArchivoComoBinario(archivo);
  
        // Crea un objeto con los datos del documento y el archivo en formato binario
        const documentoData = {
          nombre,
          categoria,
          autor,
          descripcion,
          fechaPublicacion: fechaFormateada,
          archivo: archivoBinario,
          docentes: [
            {
              id: id
            }
          ]
        };
  
        // Llama al método del servicio para crear el documento
        const response = await DocentesService.crearDocumento(documentoData);
  
        // Maneja la respuesta según sea necesario
        console.log('Documento creado:', response.data);
      } catch (error) {
        // Maneja los errores
        console.error('Error al crear el documento:', error.message);
      }
    };
  
    const handleFileChange = (e) => {
      // Actualiza el estado del archivo al seleccionar un nuevo archivo
      setArchivo(e.target.files[0]);
    };
  
    const leerArchivoComoBinario = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onload = (event) => {
          // El contenido del archivo se almacena en event.target.result
          resolve(event.target.result);
        };
  
        reader.onerror = (error) => {
          reject(error);
        };
  
        reader.readAsArrayBuffer(file);
      });
    };
  
    return (
      <div>
        <h2>Crear Nuevo Documento</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre del Documento:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
  
          <label>Categoría del Documento:</label>
          <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
  
          <label>Autor del Documento:</label>
          <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} required />
  
          <label>Descripción del Documento:</label>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
  
          <label>Fecha de Publicación:</label>
          <input type="datetime-local" value={fechaPublicacion} onChange={(e) => setFechaPublicacion(e.target.value)} required />
  
          <label>Archivo:</label>
          <input type="file" onChange={handleFileChange} required />
  
          <button type="submit">Crear Documento</button>
        </form>
      </div>
    );
  };
  
  export default CrearDocumento;