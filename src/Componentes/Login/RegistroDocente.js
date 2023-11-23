import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DocentesService from "../../Services/DocenteServices"; // Ajusta la ruta según tu estructura de carpetas
import Header from "../Globales/Header";
import Footer from "../Globales/Footer";
import "./Registro.css";


function CrearEditarDocente() {
  const [docenteData, setDocenteData] = useState({
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
      DocentesService.getDocenteById(id)
        .then((response) => {
          const docente = response.data;
          setDocenteData({
            numeroDocumento: docente.numeroDocumento,
            primerApellido: docente.primerApellido,
            segundoApellido: docente.segundoApellido,
            primerNombre: docente.primerNombre,
            segundoNombre: docente.segundoNombre,
            correoElectronico: docente.correoElectronico,
            numeroTelefonico: docente.numeroTelefonico,
            password: docente.password,
          });
        })
        .catch((error) => {
          console.error("Error al obtener los datos del docente", error);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    setDocenteData({
      ...docenteData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const docenteDataToSend = {
      numeroDocumento: docenteData.numeroDocumento,
      primerApellido: docenteData.primerApellido,
      segundoApellido: docenteData.segundoApellido,
      primerNombre: docenteData.primerNombre,
      segundoNombre: docenteData.segundoNombre,
      correoElectronico: docenteData.correoElectronico,
      numeroTelefonico: docenteData.numeroTelefonico,
      password: docenteData.password,
    };

    if (editing) {
      DocentesService.updateDocente(id, docenteDataToSend)
        .then((response) => {
          console.log("Docente actualizado con éxito", response.data);
          navigate("/docentes");
        })
        .catch((error) => {
          console.error("Error al actualizar el docente", error);
        });
    } else {
      DocentesService.createDocente(docenteDataToSend)
        .then((response) => {
          console.log("Docente creado con éxito", response.data);
          navigate("/login-docente");
        })
        .catch((error) => {
          console.error("Error al crear el docente", error);
        });
    }
  };

  return (
    <div>
      <Header/>
      <div className="col-md-6">
        <div>
          <Link to="/login-docente" className="btn btn-info mt-3 mb-5">
            ← Volver
          </Link>
        </div>
        <h2>{editing ? "Editar Docente" : "Crear Docente"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Número de Documento:</label>
            <input
              type="text"
              className="form-control"
              name="numeroDocumento"
              value={docenteData.numeroDocumento}
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
              value={docenteData.primerApellido}
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
              value={docenteData.segundoApellido}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Primer Nombre:</label>
            <input
              type="text"
              className="form-control"
              name="primerNombre"
              value={docenteData.primerNombre}
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
              value={docenteData.segundoNombre}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              className="form-control"
              name="correoElectronico"
              value={docenteData.correoElectronico}
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
              value={docenteData.numeroTelefonico}
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
              value={docenteData.password}
              onChange={handleInputChange}
              required={!editing}
            />
          </div>
          <div className="form-group mt-3 mb-3">
            <button type="submit" className="btn btn-primary mb-5">
              {editing ? "Guardar Cambios" : "Crear Docente"}
            </button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default CrearEditarDocente;
