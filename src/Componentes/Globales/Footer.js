import React from 'react';
import './Footer.css'; // Importa el archivo de estilos del footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Información de Contacto</h5>
            <p>Email: info@academic-hub.com</p>
            <p>Teléfono: +123456789</p>
          </div>
          <div className="col-md-6">
            <h5>Enlaces Rápidos</h5>
            <ul>
              <li><a href="/about">Acerca de nosotros</a></li>
              <li><a href="/terms">Términos y Condiciones</a></li>
              <li><a href="/privacy">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
