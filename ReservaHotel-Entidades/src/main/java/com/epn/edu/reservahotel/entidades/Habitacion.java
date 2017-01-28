/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.epn.edu.reservahotel.entidades;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Rainy
 */
@Entity
@Table(name = "habitacion")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Habitacion.findAll", query = "SELECT h FROM Habitacion h"),
    @NamedQuery(name = "Habitacion.findByIdHabitacion", query = "SELECT h FROM Habitacion h WHERE h.idHabitacion = :idHabitacion"),
    @NamedQuery(name = "Habitacion.findByDisponibilidad", query = "SELECT h FROM Habitacion h WHERE h.disponibilidad = :disponibilidad"),
    @NamedQuery(name = "Habitacion.findByNumeroPiso", query = "SELECT h FROM Habitacion h WHERE h.numeroPiso = :numeroPiso")})
public class Habitacion implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id_habitacion")
    private Integer idHabitacion;
    @Basic(optional = false)
    @NotNull
    @Column(name = "disponibilidad")
    private boolean disponibilidad;
    @Basic(optional = false)
    @NotNull
    @Column(name = "numero_piso")
    private int numeroPiso;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idHabitacion")
    private List<Huesped> huespedList;
    @JoinColumn(name = "id_reserva", referencedColumnName = "id_reserva")
    @ManyToOne
    private Reserva idReserva;
    @JoinColumn(name = "id_tipo_habitacion", referencedColumnName = "id_tipo_habitacion")
    @ManyToOne(optional = false)
    private TipoHabitacion idTipoHabitacion;

    public Habitacion() {
    }

    public Habitacion(Integer idHabitacion) {
        this.idHabitacion = idHabitacion;
    }

    public Habitacion(Integer idHabitacion, boolean disponibilidad, int numeroPiso) {
        this.idHabitacion = idHabitacion;
        this.disponibilidad = disponibilidad;
        this.numeroPiso = numeroPiso;
    }

    public Integer getIdHabitacion() {
        return idHabitacion;
    }

    public void setIdHabitacion(Integer idHabitacion) {
        this.idHabitacion = idHabitacion;
    }

    public boolean getDisponibilidad() {
        return disponibilidad;
    }

    public void setDisponibilidad(boolean disponibilidad) {
        this.disponibilidad = disponibilidad;
    }

    public int getNumeroPiso() {
        return numeroPiso;
    }

    public void setNumeroPiso(int numeroPiso) {
        this.numeroPiso = numeroPiso;
    }

    @XmlTransient
    public List<Huesped> getHuespedList() {
        return huespedList;
    }

    public void setHuespedList(List<Huesped> huespedList) {
        this.huespedList = huespedList;
    }

    public Reserva getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(Reserva idReserva) {
        this.idReserva = idReserva;
    }

    public TipoHabitacion getIdTipoHabitacion() {
        return idTipoHabitacion;
    }

    public void setIdTipoHabitacion(TipoHabitacion idTipoHabitacion) {
        this.idTipoHabitacion = idTipoHabitacion;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idHabitacion != null ? idHabitacion.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Habitacion)) {
            return false;
        }
        Habitacion other = (Habitacion) object;
        if ((this.idHabitacion == null && other.idHabitacion != null) || (this.idHabitacion != null && !this.idHabitacion.equals(other.idHabitacion))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.epn.edu.reservahotel.entidades.Habitacion[ idHabitacion=" + idHabitacion + " ]";
    }
    
}
