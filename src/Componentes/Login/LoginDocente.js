import React, { useState } from 'react';
import DocentesService from '../../Services/DocenteServices'; // Ajusta la ruta según tu estructura de carpetas
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import Header from "../Globales/Header";
import bglogin from "./ImgLogin/bg.jpg"

function EstudianteLoginForm() {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const docenteData = await DocentesService.loginDocente(correoElectronico, password);

      // Autenticación exitosa, puedes realizar acciones adicionales si es necesario
      console.log('Inicio de sesión exitoso. Datos del docente:', docenteData);

      // Redirigir a la página después de iniciar sesión (ajusta la ruta según tu aplicación)
      navigate(`/docentes/${docenteData.id}`);
    } catch (error) {
      setError('Inicio de sesión fallido. Verifica tus credenciales.');
    }
  };

  return (
    <div className='fondo'>
      <Header />

      <div class="login-container">
        <h2>Inicio de Sesión de Docentes</h2>
        <form onSubmit={handleLogin}>
          <label>
            Correo Electrónico o Usuario:
            <input
              type="text"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
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
            <Link to="/regitro-docente" className="btn btn-info mt-3 mb-5">
              Crear Cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>

  );
}

export default EstudianteLoginForm;
