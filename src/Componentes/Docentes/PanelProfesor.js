import React, { useEffect, useState } from "react";
import EstudianteService from "../../Services/EstudianteServices";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PanelEstudiante = () => {
  const { id } = useParams();
  const [estudiante, setEstudiante] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [anoFilter, setAnoFilter] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("");
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    EstudianteService.getEstudianteById(id).then((response) => {
      setEstudiante(response.data);
    });
  }, [id]);


  if (!estudiante) {
    return <div>Cargando información del estudiante...</div>;
  }

  return (
    <div className="student-panel-container col-md-6">
      <div className="container1">
        <h3 className="name-nombre">
          Bienvenido, {estudiante.primerNombre} {estudiante.segundoNombre} {estudiante.primerApellido} {estudiante.segundoApellido}
        </h3>
      </div>
    </div>
  );
};

export default PanelEstudiante;
