import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import './Header.css'; // Importa el archivo de estilos del Header
import logo from './img_G/logo-removebg-preview.png'; // Importa la imagen del logotipo

const Header = () => {
  return (
    <header className="header">
      <div className="containerHeader">
        <div className="logo">
          <img src={logo} alt="Logo de la aplicación"  />
         <span className='tituloHeader'>Repositorio Académico</span>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/login-estudiante">Login Estudiante</Link></li>
            <li><Link to="/login-docente">Login Docentes</Link></li>

          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
