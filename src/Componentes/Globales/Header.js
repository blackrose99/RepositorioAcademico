import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';

import logo from './img_G/logo-removebg-preview.png';

const Header = () => {
  return (
    <header className="header">
      <div className="containerHeader">
        <div className="logo">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{ width: '185px' }} alt="logo" />          <span className='tituloHeader'>Repositorio Académico</span>
        </div>
        <nav>
          <ul>
            <li><Link to="/"><FontAwesomeIcon icon={faHome} /> Inicio</Link></li>
            <li><Link to="/login-estudiante"><FontAwesomeIcon icon={faUser} /> Login Estudiante</Link></li>
            <li><Link to="/login-docente"><FontAwesomeIcon icon={faChalkboardTeacher} /> Login Docentes</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
