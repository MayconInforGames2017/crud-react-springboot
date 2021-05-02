package com.example.backend.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Grupo;
import com.example.backend.repositories.GrupoRepository;

@RestController
@RequestMapping("/api")
public class GrupoController {

	private final Logger log = LoggerFactory.getLogger(GrupoController.class);
	private GrupoRepository grupoRepository;
	
	public GrupoController(GrupoRepository grupoRepository) {
		this.grupoRepository = grupoRepository;
	}
	
	@GetMapping("/grupos")
	Collection<Grupo> grupos() {
		return grupoRepository.findAll();
	}
	
	@GetMapping("/grupo/{id}")
	ResponseEntity<?> getGrupo(@PathVariable Long id) {
		Optional<Grupo> grupo = grupoRepository.findById(id);
		return grupo.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/grupo")
	ResponseEntity<Grupo> createGrupo(@Valid @RequestBody Grupo grupo) throws URISyntaxException {
		log.info("Pedido de criação de grupo: {}", grupo);
		Grupo result = grupoRepository.save(grupo);
		return ResponseEntity.created(new URI("/api/grupo/" + result.getId()))
		         .body(result);
	}
	
	@PutMapping("/grupo/{id}")
	ResponseEntity<Grupo> updateGrupo(@Valid @RequestBody Grupo grupo) {
		log.info("Pedido de alteração de grupo: {}", grupo);
		Grupo result = grupoRepository.save(grupo);
		return ResponseEntity.ok().body(result);
	}
	
	@DeleteMapping("/grupo/{id}")
	ResponseEntity<Grupo> deleteGrupo(@PathVariable Long id) {
		log.info("Pedido de exclusão de grupo: {}", id);
		grupoRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
