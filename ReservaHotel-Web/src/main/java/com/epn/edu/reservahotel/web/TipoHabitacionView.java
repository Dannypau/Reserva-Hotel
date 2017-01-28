/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.epn.edu.reservahotel.web;

import com.epn.edu.reservahotel.clientes.TipoHabitacionFarcadeRest;
import com.epn.edu.reservahotel.entidades.TipoHabitacion;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;

/**
 *
 * @author Daniela Ramos
 */
@ManagedBean(name = "tipoHabitacionView")
public class TipoHabitacionView {

    List<TipoHabitacion> listTipoHbitacion;
    GsonBuilder gsonBuilder = new GsonBuilder();
    Gson gson = gsonBuilder.create();

    public TipoHabitacionView() {
    }

    @PostConstruct
    public void init() {
        //llenar cosas al iniciar

        TipoHabitacionFarcadeRest tipoHabitacion = new TipoHabitacionFarcadeRest();
//        
//        String tiposHabitacion=tipoHabitacion.findAll_JSON(String.class);
//        
//        listTipoHbitacion= gson.fromJson(tiposHabitacion, new TypeToken<List<TipoHabitacion>>(){}.getType());
//        tamanio=listTipoHbitacion.size()+"";
        tamanio = "54";
//        System.out.println("Tamanio" + listTipoHbitacion.size());

    }
    String tamanio;

    public void setTamanio(String tamanio) {
        this.tamanio = tamanio;
    }

    public String getTamanio() {

        return tamanio;
    }

}
