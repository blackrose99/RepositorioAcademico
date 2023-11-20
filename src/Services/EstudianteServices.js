// EstudiantesService.js

import axios from 'axios';

const ESTUDIANTES_BASE_REST_API_URL = 'http://localhost:8082/api/estudiantes/';

class EstudiantesService {
  getAllEstudiantes() {
    return axios.get(ESTUDIANTES_BASE_REST_API_URL);
  }

  getEstudianteById(id) {
    return axios.get(ESTUDIANTES_BASE_REST_API_URL + id);
  }

  createEstudiante(estudianteData) {
    return axios.post(ESTUDIANTES_BASE_REST_API_URL, estudianteData);
  }

  updateEstudiante(id, estudianteData) {
    return axios.put(ESTUDIANTES_BASE_REST_API_URL + id, estudianteData);
  }

  deleteEstudiante(id) {
    return axios.delete(ESTUDIANTES_BASE_REST_API_URL + id);
  }

  async loginEstudiante(correoOUsuario, password) {
    try {
      const response = await axios.post(ESTUDIANTES_BASE_REST_API_URL + 'login', {
        correoOUsuario: correoOUsuario,
        password: password
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Inicio de sesión fallido');
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new EstudiantesService();
