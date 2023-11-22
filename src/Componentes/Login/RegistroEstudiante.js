import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EstudianteService from "../../Services/EstudianteServices";
import Header from "../Globales/Header";
import "./Registro.css";

function CrearEditarEstudiante() {
  const [estudianteData, setEstudianteData] = useState({
    numeroDocumento: "",
    primerApellido: "",
    segundoApellido: "",
    primerNombre: "",
    segundoNombre: "",
    correoElectronico: "",
    numeroTelefonico: "",
    password: "", // Campo para la contraseña
  });

  const [editing, setEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();



  useEffect(() => {
    if (id) {
      setEditing(true);
      EstudianteService.getEstudianteById(id)
        .then((response) => {
          const estudiante = response.data;
          setEstudianteData({
            numeroDocumento: estudiante.numeroDocumento,
            primerApellido: estudiante.primerApellido,
            segundoApellido: estudiante.segundoApellido,
            primerNombre: estudiante.primerNombre,
            segundoNombre: estudiante.segundoNombre,
            correoElectronico: estudiante.correoElectronico,
            numeroTelefonico: estudiante.numeroTelefonico,
            password: estudiante.password,
          });
        })
        .catch((error) => {
          console.error("Error al obtener los datos del estudiante", error);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    setEstudianteData({
      ...estudianteData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const estudianteDataToSend = {
      numeroDocumento: estudianteData.numeroDocumento,
      primerApellido: estudianteData.primerApellido,
      segundoApellido: estudianteData.segundoApellido,
      primerNombre: estudianteData.primerNombre,
      segundoNombre: estudianteData.segundoNombre,
      correoElectronico: estudianteData.correoElectronico,
      numeroTelefonico: estudianteData.numeroTelefonico,
      password: estudianteData.password,
    };

    if (editing) {
      EstudianteService.updateEstudiante(id, estudianteDataToSend)
        .then((response) => {
          console.log("Estudiante actualizado con éxito", response.data);
          navigate("/estudiantes");
        })
        .catch((error) => {
          console.error("Error al actualizar el estudiante", error);
        });
    } else {
      EstudianteService.createEstudiante(estudianteDataToSend)
        .then((response) => {
          console.log("Estudiante creado con éxito", response.data);
          navigate("/login-estudiante");
        })
        .catch((error) => {
          console.error("Error al crear el estudiante", error);
        });
    }
  };

  return (
    <div>

    <Header/>
   
    <div className="col-md-6">
      <div>
        <Link to="/login-estudiante" className="btn btn-info mt-3 mb-5">
          ← Volver
        </Link>
      </div>
      <h2>{editing ? "Editar Estudiante" : "Crear Estudiante"}</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Número de Documento:</label>
          <input
            type="text"
            className="form-control"
            name="numeroDocumento"
            value={estudianteData.numeroDocumento}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Primer Apellido:</label>
          <input
            type="text"
            className="form-control"
            name="primerApellido"
            value={estudianteData.primerApellido}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Segundo Apellido:</label>
          <input
            type="text"
            className="form-control"
            name="segundoApellido"
            value={estudianteData.segundoApellido}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Primer Nombre:</label>
          <input
            type="text"
            className="form-control"
            name="primerNombre"
            value={estudianteData.primerNombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Segundo Nombre:</label>
          <input
            type="text"
            className="form-control"
            name="segundoNombre"
            value={estudianteData.segundoNombre}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            className="form-control"
            name="correoElectronico"
            value={estudianteData.correoElectronico}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Número Telefónico:</label>
          <input
            type="text"
            className="form-control"
            name="numeroTelefonico"
            value={estudianteData.numeroTelefonico}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={estudianteData.password}
            onChange={handleInputChange}
            required={!editing}
          />
        </div>

        <div className="form-group mt-3 mb-3">
          <button type="submit" className="btn btn-primary mb-5">
            {editing ? "Guardar Cambios" : "Crear Estudiante"}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default CrearEditarEstudiante;
