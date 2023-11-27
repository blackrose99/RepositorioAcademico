import React, { useEffect, useState } from "react";
import EstudianteService from "../../Services/EstudianteServices";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import VerDocumento from "../Documentos/DocumentList";
import logo from '../Globales/img_G/logo-removebg-preview.png'; // Importa la imagen del logotipo
import Footer from "../Globales/Footer"


const PanelEstudiante = () => {
  const { id } = useParams();
  const [estudiante, setEstudiante] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [anoFilter, setAnoFilter] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("");
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    EstudianteService.getEstudianteById(id).then((response) => {
      setEstudiante(response.data);
    });
  }, [id]);

  const handleSearch = () => {
    // Llama al método del servicio para buscar documentos por nombre
    EstudianteService.getDocumentosPorNombre(searchTerm).then((response) => {
      setDocumentos(response.data);
    });
  };

  const handleFilterByAno = () => {
    // Llama al método del servicio para buscar documentos por año
    EstudianteService.getDocumentosPorAno(anoFilter).then((response) => {
      setDocumentos(response.data);
    });
  };

  const handleFilterByCategoria = () => {
    // Llama al método del servicio para buscar documentos por categoría
    EstudianteService.getDocumentosPorCategoria(categoriaFilter).then((response) => {
      setDocumentos(response.data);
    });
  };

  if (!estudiante) {
    return <div>Cargando información del estudiante...</div>;
  }

  return (
    <div>
     <header className="header">
    <div className="containerHeader">
      <div className="logo">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{ width: '185px' }} alt="logo" />        <span className='tituloHeader'>{estudiante.primerNombre} {estudiante.segundoNombre} {estudiante.primerApellido} {estudiante.segundoApellido}</span>
      </div>
      <nav>
        <ul>
        <li><Link to={"#"}>Home</Link></li>
          <li><Link to={`/`}>Salir</Link></li>
        </ul>
      </nav>
    </div>
  </header>
        <VerDocumento/>
        <Footer/>

    </div>

  );
};

export default PanelEstudiante;
