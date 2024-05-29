
package com.repositorioAcademico.app.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.repositorioAcademico.app.Entity.Documentos;


public interface DocumentoRepository extends MongoRepository<Documentos, String> {
    List<Documentos> findAll();
    List<Documentos> findByNombre(String nombre);
    List<Documentos> findByDocentesId(String docenteId);

}


