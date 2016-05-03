package com.xavipandis.liga.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import java.time.LocalDate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Socio.
 */
@Entity
@Table(name = "socio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Socio implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "socio_equipo",
               joinColumns = @JoinColumn(name="socios_id", referencedColumnName="ID"),
               inverseJoinColumns = @JoinColumn(name="equipos_id", referencedColumnName="ID"))
    private Set<Equipo> equipos = new HashSet<>();

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

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public Set<Equipo> getEquipos() {
        return equipos;
    }

    public void setEquipos(Set<Equipo> equipos) {
        this.equipos = equipos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Socio socio = (Socio) o;
        return Objects.equals(id, socio.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Socio{" +
            "id=" + id +
            ", nombre='" + nombre + "'" +
            ", apellido='" + apellido + "'" +
            ", fechaNacimiento='" + fechaNacimiento + "'" +
            '}';
    }
}
