import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Componentes Principales
import Home from "./Componentes/Globales/Home";
import LoginEstu from "./Componentes/Login/LoginEstudiante"; // Importar el componente de inicio de sesión
import StudentDashboard from "./Componentes/Estudiantes/PanelEstudiante"; // Componente del dashboard del estudiante
import TeacherDashboard from "./Componentes/Docentes/PanelProfesor"; // Componente del dashboard del profesor
import RegistroEstudiante from "./Componentes/Login/RegistroEstudiante";
import CrearDocumento from './Componentes/Documentos/DocumentosAdd';
import LoginDocente from "./Componentes/Login/LoginDocente";
import RegistroDocente from "./Componentes/Login/RegistroDocente";
import VerDocumento from "./Componentes/Documentos/VerDocumento"
import Publicados from "./Componentes/Docentes/PublicadosList";
import EditarDocumento from './Componentes/Documentos/DocumentoEdit';


function App() {
  return (
    <div className="">
      <BrowserRouter>
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Rutas para los Estudiantes */}
            <Route path="/login-estudiante" element={<LoginEstu />} />
            <Route path="/login-docente" element={<LoginDocente />} />

            <Route path="/estudiantes/:id" element={<StudentDashboard />} /> {/* Ruta para el dashboard del estudiante */}
          
            <Route path="/regitro-estudiante" element={<RegistroEstudiante />} /> {/* Ruta para el dashboard del estudiante */}
            <Route path="/regitro-docente" element={<RegistroDocente />} /> 

            {/* Rutas para los Docentes */}
            <Route path="/docentes/:id" element={<TeacherDashboard />} /> {/* Ruta para el dashboard del profesor */}
           
            {/*Rutas Para los Documentos   */}
            <Route path="/publicados/:id" element={<Publicados />} /> 
            <Route path="/crear-documento/:id" element={<CrearDocumento />} /> 
            <Route path="/editar-documento/:docenteId/:documentoId" element={<EditarDocumento />} />
            <Route path='ver-documento/:id' element={<VerDocumento/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
