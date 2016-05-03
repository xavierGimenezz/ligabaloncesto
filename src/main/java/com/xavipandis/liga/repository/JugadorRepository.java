package com.xavipandis.liga.repository;

import com.xavipandis.liga.domain.Jugador;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Jugador entity.
 */
public interface JugadorRepository extends JpaRepository<Jugador,Long> {

    //public List<Jugador> findByCanastasGreaterThanEqual(Integer canastas);

    @Query("select jugador from Jugador jugador where jugador.canastasTotales >=:canastas")
    Page<Jugador> topPlayers(@Param("canastas") Integer canastas, Pageable pageable);


    @Query("select jugador from Jugador jugador where jugador.asistenciasTotales >=:asistencias order by jugador.asistenciasTotales desc")
    Page<Jugador> asistPlayers(@Param("asistencias") Integer asistencias, Pageable pageable);
}
