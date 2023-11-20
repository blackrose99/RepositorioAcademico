import React, { useEffect, useState } from "react";
import EstudianteService from "../../servicios/EstudianteServices";
import { useParams } from "react-router-dom"; // Importa useParams
import { Link } from "react-router-dom";

import PuntajeComponente from "../calificaciones/Puntaje";
import NivelComponente from "../calificaciones/Nivel";
import "../calificaciones/califi.css";
import imgestuInicio from "../../img/img-saberPro.png";

const InfoEstudiante = () => {
  const { id } = useParams();
  console.log("ID obtenido:", id);
  const [estudiante, setEstudiante] = useState(null);
  useEffect(() => {
    EstudianteService.getEstudianteById(id).then((response) => {
      setEstudiante(response.data);
    });
  }, [id]);

  if (!estudiante) {
    return <div>Cargando informe...</div>;
  }

  return (
    <div className="student-info-container col-md-6">
      <div className="container1">

        <h3 className="name-nombre ">
          {estudiante.primerNombre} {estudiante.segundoNombre} {estudiante.primerApellido} {estudiante.segundoApellido}{" "}
         
        </h3>
        <img className="ml-5" src={imgestuInicio} width={200} height={100} />

      </div>

      <div className="container2 mb-4">
  <div className="circle-puntaje">
   <h4 className="mt-3"><PuntajeComponente estudianteId={id} /></h4>
  </div>
  <div className="circle-nivel">
    <NivelComponente estudianteId={id} />
  </div>

</div>


      <ul className="student-info-list">
        <li>
          <strong>Tipo de Documento:</strong> {estudiante.tipoDocumento}
        </li>
        <li>
          <strong>Número de Documento:</strong> {estudiante.numeroDocumento}
        </li>
        <li>
          <strong>Primer Apellido:</strong> {estudiante.primerApellido}
        </li>
        <li>
          <strong>Segundo Apellido:</strong> {estudiante.segundoApellido}
        </li>
        <li>
          <strong>Primer Nombre:</strong> {estudiante.primerNombre}
        </li>
        <li>
          <strong>Segundo Nombre:</strong> {estudiante.segundoNombre}
        </li>
        <li>
          <strong>Correo Electrónico:</strong> {estudiante.correoElectronico}
        </li>
        <li>
          <strong>Número Telefónico:</strong> {estudiante.numeroTelefonico}
        </li>
        <li>
          <strong>Número de Registro:</strong> {estudiante.numeroRegistro}
        </li>
      </ul>
      <Link to={`/estudiantes/informe-calificaciones/${id}`}>
        <button className="btn btn-info">Ver informe De Calificaciones</button>
      </Link>
    </div>
  );
};

export default InfoEstudiante;
