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
    <div className=''>
      <Header />
      <section className="h-100 gradient-form" style={{ backgroundColor: '#aaa' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black fondo2">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{ width: '185px' }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">Repositorio Academico</h4>
                      </div>

                      <div class="">
                        <h2>Inicio de Sesión de Estudiantes</h2>
                        <form onSubmit={handleLogin}>
                          <label>
                            Correo Electrónico:
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

                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default EstudianteLoginForm;