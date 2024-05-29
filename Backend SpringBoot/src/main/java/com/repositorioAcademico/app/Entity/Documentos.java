package com.repositorioAcademico.app.Entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Document
public class Documentos {
	
	@Id
	private String id;
	private String nombre;
	private String categoria;
	private String autor;
	private String descripcion;
    private int fechaPublicacion; // Cambiado a LocalDateTime
    private String archivo; // Cambiado a String para almacenar Base64
	
    @DocumentReference
	private List<Docentes> docentes;


	
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	public String getAutor() {
		return autor;
	}
	public void setAutor(String autor) {
		this.autor = autor;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public int getFechaPublicacion() {
		return fechaPublicacion;
	}
	public void setFechaPublicacion(int fechaPublicacion) {
		this.fechaPublicacion = fechaPublicacion;
	}
	public String getArchivo() {
		return archivo;
	}
	public void setArchivo(String archivo) {
		this.archivo = archivo;
	}
	public List<Docentes> getDocentes() {
		return docentes;
	}
	public void setDocentes(List<Docentes> docentes) {
		this.docentes = docentes;
	}

	
}
