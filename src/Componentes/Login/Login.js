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
      <NavigationBar />
      <div className="estudiante-form p-5 col-md-6">
        <h2 className="form-title">Iniciar Sesión como Estudiante</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="numeroDocumento" className="form-label">Número de Documento:</label>
            <input
              type="text"
              name="numeroDocumento"
              value={formData.numeroDocumento}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="numeroRegistro" className="form-label">Número de Registro:</label>
            <input
              type="text"
              name="numeroRegistro"
              value={formData.numeroRegistro}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
        </form>
        <p className="text-danger my-3">{formData.mensajeError}</p>
      </div>
    </div>
  );
}

export default EstudianteLoginForm;
