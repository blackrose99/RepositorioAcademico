import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import "./Home.css"

import imgEstudiantes from "../Globales/img_G/kids-1093758_1920.jpg";
import imgDocetes from "../Globales/img_G/teacher-3765909_1920.jpg";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="inicio-fondo">

        <div className="row">
        <div className="col-md-12">
            <div className="card mb-3">
              <div className="card-body">
                {/* <img src={imgDocetes} className="card-img-top" alt="Docentes" /> */}

                <h5 className="card-title">Bienvenido</h5>
                <p className="card-text">
                  ¡Bienvenido al Repositorio Académico! Aquí podrás acceder a una amplia variedad de recursos educativos para estudiantes y docentes. Explora materiales, comparte conocimientos y encuentra herramientas útiles para enriquecer tu aprendizaje o enseñanza.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <img src={imgEstudiantes} className="card-img-top" alt="Estudiantes" />

                <h5 className="card-title">Estudiantes</h5>
                <p className="card-text">
                  Bienvenido al Repositorio Académico, un lugar para acceder a materiales educativos.
                </p>
                <Link to="/login-estudiante" className="btn btn-primary">
                  Iniciar Sesión como Estudiante
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <img src={imgDocetes} className="card-img-top" alt="Docentes" />

                <h5 className="card-title">Docentes</h5>
                <p className="card-text">
                  Gestiona y sube materiales educativos para compartir con tus estudiantes.
                </p>
                <Link to="/login-docente" className="btn btn-primary">
                  Iniciar Sesión como Docente
                </Link>
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
