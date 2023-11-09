import React, { useState } from 'react';
import './Login.css'; // Importa el archivo CSS
import Header from "../Globales/Header"

import LoginImg from '../Globales/img_G/login.png';
import Footer from "../Globales/Footer"

const InicioSesion = () => {
  const [tipoUsuario, setTipoUsuario] = useState('estudiante');
  const [mostrarFormularioDocente, setMostrarFormularioDocente] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticación
  };

  const cambiarTipoUsuario = (nuevoTipo) => {
    if (nuevoTipo === 'docente') {
      setMostrarFormularioDocente(true);
    } else {
      setMostrarFormularioDocente(false);
    }
    setTipoUsuario(nuevoTipo);
  };

  const cardClass = tipoUsuario === 'estudiante' ? 'cardLogin estudiante' : 'cardLogin docente';

  return (
    <div>
      <Header/>

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
    <Footer/>
    </div>
  );
};

export default InicioSesion;
