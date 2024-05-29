package com.repositorioAcademico.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.repositorioAcademico.app.Entity.Documentos;
import com.repositorioAcademico.app.Entity.Estudiantes;
import com.repositorioAcademico.app.exeption.NotFoundException;
import com.repositorioAcademico.app.repository.DocumentoRepository;
import com.repositorioAcademico.app.repository.EstudianteRepository;


@RestController
@RequestMapping(value = "/api/estudiantes")

public class EstudianteController {

	    @Autowired
	    private EstudianteRepository estudianteRepository;

	    @Autowired
	    private DocumentoRepository documentoRepository;
	    
	    
	    //lista todos los documentos
	    @GetMapping("/documentos")
	    public List<Documentos> getDocumentos() {
	        return documentoRepository.findAll();
	    }
	    
	    @GetMapping("/documentos/{id}")
	    public ResponseEntity<Documentos> getDocumentById(@PathVariable String id) {
	        Optional<Documentos> estudianteOptional = documentoRepository.findById(id);
	        if (estudianteOptional.isPresent()) {
	            return new ResponseEntity<>(estudianteOptional.get(), HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }



	    @GetMapping("/")
	    public List<Estudiantes> getEstudiantes() {
	        return estudianteRepository.findAll();
	    }
	    
	    @GetMapping("/{id}")
	    public ResponseEntity<Estudiantes> getEstudianteById(@PathVariable String id) {
	        Optional<Estudiantes> estudianteOptional = estudianteRepository.findById(id);
	        if (estudianteOptional.isPresent()) {
	            return new ResponseEntity<>(estudianteOptional.get(), HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }

	    @PostMapping("/login")
	    public ResponseEntity<String> loginEstudiante(@RequestBody Estudiantes estudiante) {
	        // Obtener el estudiante por correo electrónico y contraseña
	        Estudiantes estudianteEncontrado = estudianteRepository.findByCorreoElectronicoAndPassword(
	            estudiante.getCorreoElectronico(),
	            estudiante.getPassword()
	        );

	        // Verificar si el estudiante fue encontrado
	        if (estudianteEncontrado == null) {
	            return new ResponseEntity<>("Inicio de sesión fallido. Verifica tus credenciales.", HttpStatus.UNAUTHORIZED);
	        }

	        // Autenticación exitosa
	        return new ResponseEntity<>(estudianteEncontrado.getId(), HttpStatus.OK);
	    }

	    

	    @PostMapping("/")
	    public ResponseEntity<Estudiantes> crearEstudiante(@RequestBody Estudiantes estudiante) {
	        Estudiantes estudianteCreado = estudianteRepository.save(estudiante);
	        return new ResponseEntity<>(estudianteCreado, HttpStatus.CREATED);
	    }

	    @PutMapping("/{id}")
	    public Estudiantes updateEstudiante(@PathVariable String id, @RequestBody Estudiantes estudiante) {
	        estudiante.setId(id);
	        return estudianteRepository.save(estudiante);
	    }

	    @DeleteMapping("/{id}")
	    public Estudiantes deleteEstudiante(@PathVariable String id) {
	        Estudiantes estudiante = estudianteRepository.findById(id)
	                .orElseThrow(() -> new NotFoundException("Estudiante no encontrado"));
	        estudianteRepository.deleteById(id);
	        return estudiante;
	    }
	    
	
	    

}
