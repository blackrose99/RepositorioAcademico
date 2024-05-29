package com.repositorioAcademico.app.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.repositorioAcademico.app.Entity.Docentes;

public interface DocenteRepository extends MongoRepository<Docentes, String> {
	List<Docentes> findAll();
	Docentes findByCorreoElectronicoAndPassword(String correoElectronico, String password);	

}
