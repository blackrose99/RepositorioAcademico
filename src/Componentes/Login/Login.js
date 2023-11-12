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
      <div>
      <h2>Login</h2>
      <label>
        <input
          type="radio"
          name="userType"
          value="student"
          checked={isStudent}
          onChange={() => setIsStudent(true)}
        />
        Estudiante
      </label>
      <label>
        <input
          type="radio"
          name="userType"
          value="teacher"
          checked={!isStudent}
          onChange={() => setIsStudent(false)}
        />
        Docente
      </label>
      {transitions.map(({ item, key, props }) =>
        item ? (
          <animated.div key={key} style={props}>
            {/* Contenido para estudiantes */}
            <p>Contenido para estudiantes</p>
          </animated.div>
        ) : (
          <animated.div key={key} style={props}>
            {/* Contenido para docentes */}
            <p>Contenido para docentes</p>
          </animated.div>
        )
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default InicioSesion;
