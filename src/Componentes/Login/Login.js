import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EstudianteService from '../../servicios/EstudianteServices';
import NavigationBar from '../../plantillas/encabezado';
import './EstudianteLoginForm.css'; // Importa tus estilos CSS

function EstudianteLoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    numeroDocumento: '',
    numeroRegistro: '',
    mensajeError: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { numeroDocumento, numeroRegistro } = formData;

    try {
      const estudianteId = await EstudianteService.loginEstudiante(numeroDocumento, numeroRegistro);
      navigate(`/estudiantes/${estudianteId}`);
    } catch (error) {
      setFormData({ ...formData, mensajeError: error.message });
    }
  };

  return (
    <div>
      <Header />

      <div className={cardClass}>
        <h1>Iniciar Sesión</h1>


          <img className="image" src={LoginImg} alt="Inicio de Sesión" />
          <div className="switch-container">
            <button
              className={tipoUsuario === 'estudiante' ? 'switch-btn active' : 'switch-btn'}
              onClick={() => cambiarTipoUsuario('docente')}
            >
              Docente
            </button>
            <button
              className={tipoUsuario === 'docente' ? 'switch-btn active' : 'switch-btn'}
              onClick={() => cambiarTipoUsuario('estudiante')}
            >
              Estudiante
            </button>
          </div>

          {mostrarFormularioDocente ? (
            <form onSubmit={handleSubmit}>
              <label>
                Usuario:
                <input type="text" />
              </label>
              <label>
                Contraseña:
                <input type="password" />
              </label>
              <button type="submit">
                Iniciar Sesión como Docente
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                Usuario:
                <input type="text" />
              </label>
              <label>
                Contraseña:
                <input type="password" />
              </label>
              <button type="submit">
                Iniciar Sesión como Estudiante
              </button>
            </form>
          )}
      </div>
    </div>
  );
}

export default EstudianteLoginForm;
