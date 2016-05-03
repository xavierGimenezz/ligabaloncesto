package com.xavipandis.liga.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import java.time.LocalDate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Entrenador.
 */
@Entity
@Table(name = "entrenador")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Entrenador implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @OneToOne(mappedBy = "entrenador")
    @JsonIgnore
    private Equipo equipo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public Equipo getEquipo() {
        return equipo;
    }

    public void setEquipo(Equipo equipo) {
        this.equipo = equipo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Entrenador entrenador = (Entrenador) o;
        return Objects.equals(id, entrenador.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Entrenador{" +
            "id=" + id +
            ", nombre='" + nombre + "'" +
            ", fechaNacimiento='" + fechaNacimiento + "'" +
            '}';
    }
}
