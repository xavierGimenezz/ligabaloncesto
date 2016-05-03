package com.xavipandis.liga.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Partido.
 */
@Entity
@Table(name = "partido")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Partido implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "jornada", nullable = false)
    private Integer jornada;

    @ManyToOne
    @JoinColumn(name = "arbitro_id")
    private Arbitro arbitro;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getJornada() {
        return jornada;
    }

    public void setJornada(Integer jornada) {
        this.jornada = jornada;
    }

    public Arbitro getArbitro() {
        return arbitro;
    }

    public void setArbitro(Arbitro arbitro) {
        this.arbitro = arbitro;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Partido partido = (Partido) o;
        return Objects.equals(id, partido.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Partido{" +
            "id=" + id +
            ", jornada='" + jornada + "'" +
            '}';
    }
}
