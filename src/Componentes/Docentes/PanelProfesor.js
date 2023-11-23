import React, { useEffect, useState } from "react";
import DocentesService from "../../Services/DocenteServices";
import { useParams ,Link} from "react-router-dom";

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
    <div>

    <div className="student-panel-container col-md-6">
      <div className="container1">
        <h3 className="name-nombre">
          Bienvenido, {docente.primerNombre} {docente.segundoNombre} {docente.primerApellido} {docente.segundoApellido}
        </h3>
      </div>
    </div>
        <div>

     <Link to={`/crear-documento/${docente.id}`} className="btn btn-info mt-3 mb-5">
  Publicar +
    </Link>


        </div>
     
    </div>
  );
};

export default PanelEstudiante;
