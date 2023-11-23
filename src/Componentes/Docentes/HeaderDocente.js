import React, { useEffect, useState } from "react";
import DocentesService from "../../Services/DocenteServices";
import { useParams ,Link} from "react-router-dom";
import logo from '../Globales/img_G/logo-removebg-preview.png'; // Importa la imagen del logotipo


const PanelEstudiante = () => {
  const { id } = useParams();
  const [docente, setDocente] = useState(null);

  useEffect(() => {
    // Obtén la información del docente usando el ID del estudiante
    DocentesService.getDocenteById(id)
      .then((response) => {
        setDocente(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener información del docente:", error);
      });
  }, [id]);

  if (!docente) {
    return <div>Cargando información del Docente...</div>;
  }

  return (
    <header className="header">
    <div className="containerHeader">
      <div className="logo">
        <img src={logo} alt="Logo de la aplicación" />
        <span className='tituloHeader'>{docente.primerNombre} {docente.segundoNombre} {docente.primerApellido} {docente.segundoApellido}</span>
      </div>
      <nav>
        <ul>
        <li><Link to={`/docentes/${docente.id}`}>Home</Link></li>
          <li><Link to={`/crear-documento/${docente.id}`}>Publicar +</Link></li>
          <li><Link to={`/`}>Publicados</Link></li>
          <li><Link to={`/`}>Salir</Link></li>
        </ul>
      </nav>
    </div>
  </header>
  );
};

export default PanelEstudiante;
