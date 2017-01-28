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
@Table(name = "tipo_habitacion")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "TipoHabitacion.findAll", query = "SELECT t FROM TipoHabitacion t"),
    @NamedQuery(name = "TipoHabitacion.findByIdTipoHabitacion", query = "SELECT t FROM TipoHabitacion t WHERE t.idTipoHabitacion = :idTipoHabitacion"),
    @NamedQuery(name = "TipoHabitacion.findByVistaMar", query = "SELECT t FROM TipoHabitacion t WHERE t.vistaMar = :vistaMar"),
    @NamedQuery(name = "TipoHabitacion.findByJacuzzi", query = "SELECT t FROM TipoHabitacion t WHERE t.jacuzzi = :jacuzzi"),
    @NamedQuery(name = "TipoHabitacion.findByNumeroCamas", query = "SELECT t FROM TipoHabitacion t WHERE t.numeroCamas = :numeroCamas"),
    @NamedQuery(name = "TipoHabitacion.findByCosto", query = "SELECT t FROM TipoHabitacion t WHERE t.costo = :costo")})
public class TipoHabitacion implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id_tipo_habitacion")
    private Integer idTipoHabitacion;
    @Basic(optional = false)
    @NotNull
    @Column(name = "vista_mar")
    private boolean vistaMar;
    @Basic(optional = false)
    @NotNull
    @Column(name = "jacuzzi")
    private boolean jacuzzi;
    @Basic(optional = false)
    @NotNull
    @Column(name = "numero_camas")
    private int numeroCamas;
    @Basic(optional = false)
    @NotNull
    @Column(name = "costo")
    private double costo;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idTipoHabitacion")
    private List<Habitacion> habitacionList;

    public TipoHabitacion() {
    }

    public TipoHabitacion(Integer idTipoHabitacion) {
        this.idTipoHabitacion = idTipoHabitacion;
    }

    public TipoHabitacion(Integer idTipoHabitacion, boolean vistaMar, boolean jacuzzi, int numeroCamas, double costo) {
        this.idTipoHabitacion = idTipoHabitacion;
        this.vistaMar = vistaMar;
        this.jacuzzi = jacuzzi;
        this.numeroCamas = numeroCamas;
        this.costo = costo;
    }

    public Integer getIdTipoHabitacion() {
        return idTipoHabitacion;
    }

    public void setIdTipoHabitacion(Integer idTipoHabitacion) {
        this.idTipoHabitacion = idTipoHabitacion;
    }

    public boolean getVistaMar() {
        return vistaMar;
    }

    public void setVistaMar(boolean vistaMar) {
        this.vistaMar = vistaMar;
    }

    public boolean getJacuzzi() {
        return jacuzzi;
    }

    public void setJacuzzi(boolean jacuzzi) {
        this.jacuzzi = jacuzzi;
    }

    public int getNumeroCamas() {
        return numeroCamas;
    }

    public void setNumeroCamas(int numeroCamas) {
        this.numeroCamas = numeroCamas;
    }

    public double getCosto() {
        return costo;
    }

    public void setCosto(double costo) {
        this.costo = costo;
    }

    @XmlTransient
    public List<Habitacion> getHabitacionList() {
        return habitacionList;
    }

    public void setHabitacionList(List<Habitacion> habitacionList) {
        this.habitacionList = habitacionList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idTipoHabitacion != null ? idTipoHabitacion.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof TipoHabitacion)) {
            return false;
        }
        TipoHabitacion other = (TipoHabitacion) object;
        if ((this.idTipoHabitacion == null && other.idTipoHabitacion != null) || (this.idTipoHabitacion != null && !this.idTipoHabitacion.equals(other.idTipoHabitacion))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.epn.edu.reservahotel.entidades.TipoHabitacion[ idTipoHabitacion=" + idTipoHabitacion + " ]";
    }
    
}
