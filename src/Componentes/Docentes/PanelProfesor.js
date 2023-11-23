import React, { useEffect, useState } from "react";
import DocentesService from "../../Services/DocenteServices";
import { useParams, Link } from "react-router-dom";
import HeaderDocente from "./HeaderDocente";
import Footer from "../Globales/Footer";
import ListaDocumentos from "../Documentos/DocumentList";


const PanelEstudiante = () => {
  const { id } = useParams();
  const [docente, setDocente] = useState(null);

  useEffect(() => {
    // Obtén la información del docente usando el ID del estudiante
    DocentesService.getDocenteById(id)
      .then((response) => {
        setDocente(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener información del docente:", error);
      });
  }, [id]);

  if (!docente) {
    return <div>Cargando información del Docente...</div>;
  }

  return (
    <div>
      <HeaderDocente />
      <div className="container">
        <h1 className="titulo">{docente.primerNombre} {docente.segundoNombre} {docente.primerApellido} {docente.segundoApellido}</h1>
        <p className="descripcion">{docente.descripcion}</p>
      </div>

      <div className="containern">
        <h1>Barra de Busqueda</h1>
        <ListaDocumentos />
      </div>
      <Footer />
    </div>
  );
};

export default PanelEstudiante;
