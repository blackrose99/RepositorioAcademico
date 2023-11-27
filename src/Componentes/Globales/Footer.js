import React from 'react';
import './Footer.css'; // Importa el archivo de estilos del footer

const Footer = () => {
  return (
    <footer className="footer text-center">
      <div className="container mx-auto">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{ width: '185px' }} alt="logo" />
        <div className="row">
          <div className="col-md-4 mx-auto">
            <h5>Información de Contacto</h5>
            <p>GitHub: Blackrose99/RepositorioAcademico</p>
            <p>Dockerhub: lmcastano/empresariales</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p>&copy; 2023 Academic Hub. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
