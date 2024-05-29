package com.repositorioAcademico.app.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.repositorioAcademico.app.Entity.Estudiantes;

public interface EstudianteRepository extends MongoRepository<Estudiantes, String> {
    List<Estudiantes> findAll();

	Estudiantes findByCorreoElectronicoAndPassword(String correoElectronico, String password);

}

