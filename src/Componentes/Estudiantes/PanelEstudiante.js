import React, { useEffect, useState } from "react";
import EstudianteService from "../../Services/EstudianteServices";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <div className="student-panel-container col-md-6">
      <div className="container1">
        <h3 className="name-nombre">
          Bienvenido, {estudiante.primerNombre} {estudiante.segundoNombre} {estudiante.primerApellido} {estudiante.segundoApellido}
        </h3>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar en el repositorio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={anoFilter} onChange={(e) => setAnoFilter(e.target.value)}>
          <option value="">Filtrar por año</option>
          {/* Opciones de años */}
        </select>
        <select value={categoriaFilter} onChange={(e) => setCategoriaFilter(e.target.value)}>
          <option value="">Filtrar por categoría</option>
          {/* Opciones de categorías */}
        </select>
        <button onClick={handleSearch}>Buscar por Nombre</button>
        <button onClick={handleFilterByAno}>Filtrar por Año</button>
        <button onClick={handleFilterByCategoria}>Filtrar por Categoría</button>
      </div>

      {/* Aquí puedes mostrar la lista de documentos */}
      <ul>
        {documentos.map((documento) => (
          <li key={documento.id}>{documento.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default PanelEstudiante;
