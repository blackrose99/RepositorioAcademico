import React, { useState } from 'react';
import EstudiantesService from '../../Services/EstudianteServices'; // Ajusta la ruta según tu estructura de carpetas
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Login.css"
import Header from "../Globales/Header";
import Footer from '../Globales/Footer';


function EstudianteLoginForm() {
  const [correoOUsuario, setCorreoOUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const estudianteId = await EstudiantesService.loginEstudiante(correoOUsuario, password);

      // Autenticación exitosa, puedes realizar acciones adicionales si es necesario
      console.log('Inicio de sesión exitoso. ID del estudiante:', estudianteId);

      // Redirigir a la página después de iniciar sesión (ajusta la ruta según tu aplicación)
      navigate(`/estudiantes/${estudianteId}`);
    } catch (error) {
      setError('Inicio de sesión fallido. Verifica tus credenciales.');
    }
  };

  return (
    <div className='fondo2'>
      <Header />

      <div class="login-container">
        <h2>Inicio de Sesión de Estudiantes</h2>
        <form onSubmit={handleLogin}>
          <label>
            Correo Electrónico o Usuario:
            <input
              type="text"
              value={correoOUsuario}
              onChange={(e) => setCorreoOUsuario(e.target.value)}
            />
          </label>
          <br />
          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Iniciar Sesión</button>
          {error && <p>{error}</p>}
          <div>
            <Link to="/regitro-estudiante" className="btn btn-info mt-3 mb-5">
              Crear Cuenta
            </Link>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default EstudianteLoginForm;
