package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Grupo;

@Repository
public interface GrupoRepository extends JpaRepository<Grupo, Long> {

	Grupo findByNome(String nome);

}
