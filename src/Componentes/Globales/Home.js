import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Home.css';

import imgEstudiantes from "../Globales/img_G/pexels-tima-miroshnichenko-9572703.jpg";
import imgDocetes from "../Globales/img_G/teacher-3765909_1920.jpg";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="inicio-fondo">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">¡Bienvenido al Repositorio Académico!</h5>
                  <p className="card-text">
                    Encuentra una amplia gama de recursos educativos para estudiantes y docentes. Explora, aprende y comparte conocimientos.
                  </p>
                  <p className="card-text">
                    Destacamos por nuestra colección diversa y actualizada de materiales educativos.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-3">
                <img src={imgEstudiantes} className="card-img-top" alt="Estudiantes" />
                <div className="card-body">
                  <h5 className="card-title">Estudiantes</h5>
                  <p className="card-text">
                    Explora y accede a recursos educativos.
                  </p>

                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-3">
                <img src={imgDocetes} className="card-img-topdocentes" alt="Docentes" />
                <div className="card-body">
                  <h5 className="card-title">Docentes</h5>
                  <p className="card-text">
                    Gestiona y comparte materiales con tus estudiantes.
                  </p>

                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Características Destacadas</h5>
                  <ul className="list-group">
                    <li className="list-group-item">Acceso a una amplia variedad de materiales educativos.</li>
                    <li className="list-group-item">Sistema de gestión de recursos y usuarios.</li>
                    <li className="list-group-item">Actualización constante de contenidos.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Testimonios de Usuarios</h5>
                  <p className="card-text">
                    "Excelente plataforma para encontrar material educativo de calidad." - Profesor: Barney
                  </p>
                  <p className="card-text">
                    "¡Muy útil! Encontré exactamente lo que necesitaba para mi clase." - Estudiante: Zamora
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;