package com.xavipandis.liga.repository;

import com.xavipandis.liga.domain.Arbitro;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Arbitro entity.
 */
public interface ArbitroRepository extends JpaRepository<Arbitro,Long> {

}
