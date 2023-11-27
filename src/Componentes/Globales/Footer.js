import React from 'react';
import './Footer.css'; // Importa el archivo de estilos del footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Información de Contacto</h5>
            <p>GitHub: Blackrose99/RepositorioAcademico</p>
            <p>Dockerhub: lmcastano/empresariales</p>
          </div>
          <div className="col-md-4">
            <h5>Enlaces Rápidos</h5>
            <ul>
              <li><a href="/terms" className="footer-link">Términos y Condiciones</a></li>
              <li><a href="/privacy" className="footer-link">Política de Privacidad</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            {/* Espacio para contenido adicional */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p>&copy; 2023 Academic Hub. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;