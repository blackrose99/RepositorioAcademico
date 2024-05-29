package com.repositorioAcademico.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.repositorioAcademico.app.Entity.*;
import com.repositorioAcademico.app.exeption.NotFoundException;
import com.repositorioAcademico.app.repository.DocenteRepository;
import com.repositorioAcademico.app.repository.DocumentoRepository;

@RestController
@RequestMapping(value = "/api/docentes")
public class DocenteController {

    @Autowired
    private DocenteRepository docenteRepository;


    @Autowired
    private DocumentoRepository documentoRepository;
    
    
    //lista todos los documentos
    @GetMapping("/documentos")
    public List<Documentos> getDocumentos() {
        return documentoRepository.findAll();
    }
    
    @GetMapping("/documentos/{id}")
    public ResponseEntity<Documentos> getDocumentById(@PathVariable String id) {
        Optional<Documentos> documentoOptional = documentoRepository.findById(id);
        return documentoOptional.map(documento -> new ResponseEntity<>(documento, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/documentos/docente/{docenteId}")
    public ResponseEntity<List<Documentos>> getDocumentosByDocenteId(@PathVariable String docenteId) {
        List<Documentos> documentos = documentoRepository.findByDocentesId(docenteId);
        
        if (!documentos.isEmpty()) {
            return new ResponseEntity<>(documentos, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/documentos")
    public ResponseEntity<Documentos> crearDocumento(@RequestBody Documentos documento) {
        try {
            Documentos documentoCreado = documentoRepository.save(documento);
            return new ResponseEntity<>(documentoCreado, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/documentos/{id}")
    public ResponseEntity<Documentos> editarDocumento(@PathVariable String id, @RequestBody Documentos documentoDetails) {
        try {
            Documentos documentoExistente = documentoRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Documento no encontrado"));

            // Puedes agregar lógica de validación de propietario aquí si es necesario

            // No actualices el ID del docente al que pertenece el documento
            documentoDetails.setDocentes(documentoExistente.getDocentes());

            documentoExistente.setNombre(documentoDetails.getNombre());
            documentoExistente.setCategoria(documentoDetails.getCategoria());
            // Actualizar otros campos según sea necesario

            Documentos documentoActualizado = documentoRepository.save(documentoExistente);
            return new ResponseEntity<>(documentoActualizado, HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/documentos/{id}")
    public ResponseEntity<Documentos> eliminarDocumento(@PathVariable String id) {
        try {
            Documentos documento = documentoRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Documento no encontrado"));

            // Lógica de validación de propietario aquí

            documentoRepository.deleteById(id);
            return new ResponseEntity<>(documento, HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }





    

//Mapeos Para los Docentes 
    @GetMapping("/")
    public List<Docentes> getDocentes() {
        return docenteRepository.findAll();
  }
    
    @PostMapping("/login")
    public ResponseEntity<String> loginEstudiante(@RequestBody Docentes docente) {
        // Obtener el estudiante por correo electrónico y contraseña
    	Docentes estudianteEncontrado = docenteRepository.findByCorreoElectronicoAndPassword(
    			docente.getCorreoElectronico(),
    			docente.getPassword()
        );

        // Verificar si el estudiante fue encontrado
        if (estudianteEncontrado == null) {
            return new ResponseEntity<>("Inicio de sesión fallido. Verifica tus credenciales.", HttpStatus.UNAUTHORIZED);
        }

        // Autenticación exitosa
        return new ResponseEntity<>(estudianteEncontrado.getId(), HttpStatus.OK);
    }

    


    @GetMapping("/{id}")
    public ResponseEntity<Docentes> getEstudianteById(@PathVariable String id) {
        Optional<Docentes> estudianteOptional = docenteRepository.findById(id);
        if (estudianteOptional.isPresent()) {
            return new ResponseEntity<>(estudianteOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/")
    public ResponseEntity<Docentes> crearEstudiante(@RequestBody Docentes docente) {
    	Docentes estudianteCreado = docenteRepository.save(docente);
        return new ResponseEntity<>(estudianteCreado, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public Docentes updateEstudiante(@PathVariable String id, @RequestBody Docentes docente) {
    	docente.setId(id);
        return docenteRepository.save(docente);
    }

    @DeleteMapping("/{id}")
    public Docentes deleteEstudiante(@PathVariable String id) {
    	Docentes docente = docenteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Docente no encontrado"));
        docenteRepository.deleteById(id);
        return docente;
    }
    


}