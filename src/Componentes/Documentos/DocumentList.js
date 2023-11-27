import React, { useState, useEffect } from 'react';
import DocentesService from '../../Services/DocenteServices';
import { useParams, Link } from 'react-router-dom';
import "./ListaDocumentos.css";
import logo from '../Globales/img_G/unnamed.png'; // Importa la imagen del logotipo
import Modal from 'react-modal';
import { RingLoader } from 'react-spinners';

Modal.setAppElement('#root');

const ListaDocumentos = () => {
  const { id: docenteId } = useParams();
  const [documentosOriginales, setDocumentosOriginales] = useState([]);
  const [documentosFiltrados, setDocumentosFiltrados] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [showDownloadAnimation, setShowDownloadAnimation] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(true);

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const response = await DocentesService.getAllDocumentos(docenteId);
        const documentosData = response.data;
        setDocumentosOriginales(documentosData);
        setDocumentosFiltrados(documentosData);
        setLoading(false);
        setModalIsOpen(false);
      } catch (error) {
        console.error('Error al obtener la lista de documentos:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchDocumentos();
  }, [docenteId]);

  const truncateDescription = (description, maxLength) => {
    if (description && description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    filterDocuments(searchText, filtroFecha, filtroCategoria);
  };

  const handleFechaChange = (e) => {
    const fecha = e.target.value;
    setFiltroFecha(fecha);
    filterDocuments('', fecha, filtroCategoria);
  };

  const handleCategoriaChange = (e) => {
    const categoria = e.target.value;
    setFiltroCategoria(categoria);
    filterDocuments('', filtroFecha, categoria);
  };

  const filterDocuments = (searchText, fecha, categoria) => {
    const documentosFiltrados = documentosOriginales.filter((documento) => {
      const nombreMatch = documento.nombre.toLowerCase().includes(searchText);
      const fechaMatch = !fecha || documento.fechaPublicacion.toString().includes(fecha);
      const categoriaMatch = !categoria || documento.categoria === categoria;

      return nombreMatch && fechaMatch && categoriaMatch;
    });

    setDocumentosFiltrados(documentosFiltrados);
  };

  const handleAnioChange = (e) => {
    const anio = e.target.value;
    setFiltroFecha(anio);
    filterDocuments('', anio, filtroCategoria);
  };

  if (error) {
    return <div>Error al obtener la lista de documentos: {error.message}</div>;
  }

  if (loading) {
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <RingLoader color="#36D7B7" loading={loading} size={150} />
        <div>Cargando...</div>
      </Modal>
    );
  }

  return (
    <div className='container'>
      <div className="input-group mb-4">
        <input id="buscar" type="text" className="form-control" placeholder="Buscar documento..." onChange={handleSearchChange} />
      </div>

      <div className='row'>
        <div className='col-md-3'>
          <div className="mb-4">
            <label>Filtrar por Categoría:</label>
            <select className="form-control" onChange={handleCategoriaChange}>
              <option value="">Todas</option>
              <option value="Tecnologia">Tecnología</option>
              <option value="Ciencia">Ciencia</option>
              <option value="Arte">Arte</option>
              <option value="Historia">Historia</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
          <div className="mb-4">
            <label>Filtrar por Año:</label>
            <select className="form-control" onChange={handleAnioChange}>
              <option value="">Todos</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>

        <div className='col-md-9'>
          <table id="documentosTable" className="table mb-5">
            <tbody>
              {documentosFiltrados.map((documento) => (
                <tr key={documento.id}>
                  <td>
                    <Link to={`/ver-documento/${documento.id}`}>
                      <img src={logo} alt={documento.nombre} className='pdf_img' />
                    </Link>
                  </td>
                  <td>{documento.nombre}</td>
                  <td>{truncateDescription(documento.descripcion, 50)}</td>
                  <td>{documento.fechaPublicacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListaDocumentos;
