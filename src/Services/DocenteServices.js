import axios from 'axios';

const DOCENTES_BASE_REST_API_URL = 'http://localhost:8082/api/docentes/';
const DOCENTES_BASE_REST_API_URL2 = 'http://localhost:8082/api/docentes/documentos';


class DocentesService {
  getAllDocentes() {
    return axios.get(DOCENTES_BASE_REST_API_URL);
  }

  getDocenteById(id) {
    return axios.get(DOCENTES_BASE_REST_API_URL + id);
  }

  createDocente(docenteData) {
    return axios.post(DOCENTES_BASE_REST_API_URL, docenteData);
  }

  updateDocente(id, docenteData) {
    return axios.put(DOCENTES_BASE_REST_API_URL + id, docenteData);
  }

  deleteDocente(id) {
    return axios.delete(DOCENTES_BASE_REST_API_URL + id);
  }

  async loginDocente(correoElectronico, password) {
    try {
      const response = await axios.post(DOCENTES_BASE_REST_API_URL + 'login', {
        correoElectronico: correoElectronico,
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

  // Método para obtener todos los documentos
  getAllDocumentos() {
    return axios.get(DOCENTES_BASE_REST_API_URL + 'documentos');
  }

  // metodo para crear un documento desde un formulario
  createDocente(docenteData) {
    return axios.post(DOCENTES_BASE_REST_API_URL + 'documentos', docenteData);
  }
  
  // Método para obtener un documento por su ID
  getDocumentById = async (documentoId) => {
    return axios.get(`${DOCENTES_BASE_REST_API_URL2}/${documentoId}`);
  };
}

export default new DocentesService();
