import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Componentes Principales
import Home from "./Componentes/Globales/Home";
import Login from "./Componentes/Login/Login"; // Importar el componente de inicio de sesión
import StudentDashboard from "./Componentes/Estudiantes/PanelEstudiante"; // Componente del dashboard del estudiante
import TeacherDashboard from "./Componentes/Docentes/PanelProfesor"; // Componente del dashboard del profesor

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Rutas para los Estudiantes */}
             <Route path="/login" element={<Login />} /> 
            <Route path="/estudiantes" element={<StudentDashboard />} /> {/* Ruta para el dashboard del estudiante */}
            
            {/* Rutas para los Docentes */}
            <Route path="/teacher" element={<TeacherDashboard />} /> {/* Ruta para el dashboard del profesor */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
