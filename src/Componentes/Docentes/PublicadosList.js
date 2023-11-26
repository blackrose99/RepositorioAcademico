import React, { useState, useEffect } from 'react';
import DocentesService from '../../Services/DocenteServices';
import { useParams, Link } from 'react-router-dom';
import "../Documentos/ListaDocumentos.css";
import logo from '../Globales/img_G/unnamed.png';
import HeaderDocente from '../Docentes/HeaderDocente';


// Definición de la función truncateDescription
const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
        return `${description.substring(0, maxLength)}...`;
    }
    return description;
};

// Componente ListaDocumentos
const ListaDocumentos = () => {
    const { id: docenteId } = useParams();
    const [documentosOriginales, setDocumentosOriginales] = useState([]);
    const [documentosFiltrados, setDocumentosFiltrados] = useState([]);

    useEffect(() => {
        const fetchDocumentos = async () => {
            try {
                const response = await DocentesService.getDocumentosByDocenteId(docenteId);
                const documentosData = response.data;
                setDocumentosOriginales(documentosData);
                setDocumentosFiltrados(documentosData);
            } catch (error) {
                console.error('Error al obtener la lista de documentos:', error);
            }
        };

        fetchDocumentos();
    }, [docenteId]);

    const handleEliminarDocumento = async (documentoId) => {
        try {
            // Lógica para eliminar el documento
            // Aquí debes llamar a tu servicio o método para eliminar el documento
            await DocentesService.deleteDocumento(documentoId);

            // Actualizar la lista de documentos después de eliminar
            const updatedDocumentos = documentosOriginales.filter((documento) => documento.id !== documentoId);
            setDocumentosOriginales(updatedDocumentos);
            setDocumentosFiltrados(updatedDocumentos);
        } catch (error) {
            console.error('Error al eliminar el documento:', error);
        }
    };

    return (
        <div>
             
                        <HeaderDocente />
          
        <div className='col-md-9'>
            <table id="documentosTable" className="table mb-5">
                <thead>
                    <tr>
                        <th>PDF</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Fecha de Publicación</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
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
                            {/* Asegúrate de que 'fechaPublicacion' sea un formato de fecha válido o ajusta según sea necesario */}
                            <td>{documento.fechaPublicacion}</td>
                            <td>
                                <button onClick={() => handleEliminarDocumento(documento.id)} >Eliminar</button>
                            </td>
                            <td>
                                <Link to={`/editar-documento/${docenteId}/${documento.id}`} className='btn btn-primary'>
                                    Editar
                                </Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default ListaDocumentos;
