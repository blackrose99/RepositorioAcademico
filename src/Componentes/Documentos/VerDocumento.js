import React, { useState, useEffect } from 'react';
import DocentesService from '../../Services/DocenteServices';
import { useParams } from 'react-router-dom';
import "./VerDocumento.css";
import Modal from 'react-modal';
import { RingLoader } from 'react-spinners';

Modal.setAppElement('#root');

const VerDocumento = () => {
  const { id: documentoId } = useParams();
  const [documento, setDocumento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  useEffect(() => {
    const fetchDocumento = async () => {
      try {
        const response = await DocentesService.getDocumentById(documentoId);
        setDocumento(response.data);
        setLoading(false); // Se establece como falso cuando el documento se carga
        setModalIsOpen(false); // Cerrar el modal cuando el documento se carga

      } catch (error) {
        console.error('Error al obtener el documento:', error);
        setError(error);
        setLoading(false); // También establece como falso en caso de error
      }
    };

    fetchDocumento();
  }, [documentoId]);

  const handleDownload = async () => {
    const base64String = documento.archivo;
    console.log('Valor de documento.archivo:', base64String);

    try {
      const decodedData = atob(base64String);
      const byteCharacters = new Uint8Array(decodedData.length);
      for (let i = 0; i < decodedData.length; i++) {
        byteCharacters[i] = decodedData.charCodeAt(i);
      }
      const blob = new Blob([byteCharacters], { type: 'application/pdf' });

      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error al decodificar y mostrar el archivo PDF:', error);
    }
  };

  if (error) {
    return <div>Error al obtener el documento: {error.message}</div>;
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


  if (!documento) {
    return <div>No se encontró el documento.</div>;
  }
  return (
    <div className='ver-documento-container'>
      <h2 className='ver-documento-title'>Detalles del Documento</h2>
      <div className='ver-documento-item'>
        <strong>Nombre:</strong> {documento.nombre}
      </div>
      <div className='ver-documento-item'>
        <strong>Categoría:</strong> {documento.categoria}
      </div>
      <div className='ver-documento-item'>
        <strong>Autor:</strong> {documento.autor}
      </div>
      <div className='ver-documento-item'>
        <strong>Descripción:</strong> {documento.descripcion}
      </div>
      <div className='ver-documento-item'>
        <strong>Fecha de Publicación:</strong> {documento.fechaPublicacion}
      </div>
      <div className='ver-documento-item'>
        <strong>Publicado Por El Docente:</strong>{' '}
        {documento.docentes.map((docente) => docente.primerNombre + ' ' + docente.primerApellido).join(', ')}
      </div>
      <div className='ver-documento-item'>
        <button className='ver-documento-button' onClick={handleDownload}>
          Descargar Archivo
        </button>
      </div>
    </div>
  );
};

export default VerDocumento;
