import React, { useEffect, useState } from "react";
import DocentesService from "../../Services/DocenteServices";
import { useParams } from "react-router-dom";
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
      <HeaderDocente/>
      <ListaDocumentos/>
      <Footer/>
    </div>
  );
};

export default PanelEstudiante;
