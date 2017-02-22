/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Passwords = require('machinepack-passwords');
module.exports = {

    login: function (req, res) {


        var parametros = req.allParams();

        if (parametros.correo && parametros.password) {

            Cliente.findOne({
                correo: parametros.correo
            }).exec(function (errorInesperado, ClienteEncontrado) {

                if (errorInesperado) {
                    return res.view('Error', {
                        error: {
                            desripcion: "Error inesperado del servidor",
                            rawError: errorInesperado,
                            url: "/login"
                        }
                    });
                }
                if (ClienteEncontrado) {

                    Passwords.checkPassword({
                        passwordAttempt: parametros.password,
                        encryptedPassword: ClienteEncontrado.password,
                    }).exec({
                        error: function (err) {
                            return res.view('Error', {
                                error: {
                                    desripcion: "Error Inesperado",
                                    rawError: err,
                                    url: "/login"
                                }
                            });
                        },
                        incorrect: function () {

                            return res.view('Error', {
                                error: {
                                    desripcion: "Ingrese su password correctamente",
                                    rawError: "Password Incorrecta",
                                    url: "login"
                                }
                            });

                        },
                        success: function () {
                            req.session.credencialSegura = ClienteEncontrado.id;
                            console.log(parametros.fecha_inicio && parametros.fecha_fin && parametros.id_hab && parametros.nombre_huesped && parametros.costo_total && parametros.total_dias);
                            if (parametros.fecha_inicio && parametros.fecha_fin && parametros.id_hab && parametros.nombre_huesped && parametros.costo_total && parametros.total_dias) {
                                return res.view('reserva/finalizar/', {
                                    fecha_inicio: parametros.fecha_inicio,
                                    fecha_fin: parametros.fecha_fin,
                                    id_hab: parametros.id_hab,
                                    nombre_huesped: parametros.nombre_huesped,
                                    dni: parametros.dni,
                                    costo_total: parametros.costo_total,
                                    total_dias: parametros.total_dias
                                });
                            }
                            else{
                            return res.view('cliente/show/', {
                                element: {
                                    dni: ClienteEncontrado.dni,
                                    nombre_cliente: ClienteEncontrado.nombre_cliente,
                                    correo: ClienteEncontrado.correo,
                                    telefono: ClienteEncontrado.telefono
                                }
                            });
                            }
                        },
                    });



                } else {

                    return res.view('Error', {
                        error: {
                            desripcion: "No se encontro al Cliente",
                            rawError: "No existe Cliente",
                            url: "/login"
                        }
                    });
                }
            })
        } else {
            return res.view('Error', {
                error: {
                    desripcion: "Necesitamos su correo y password",
                    rawError: "No envia Parametros",
                    url: "/login"
                }
            });
        }






    },

    close: function (req, res) {
        req.session.destroy(function (err) {

            if (err) {
                return res.view('Error', {
                    error: {
                        desripcion: "Error inesperado del servidor",
                        rawError: errorInesperado,
                        url: "/login"
                    }
                });
            }
            return res.view('FinSesion', {
                fin: {
                    desripcion: "La sesión ha sido finalizada. Regresa pronto.",
                    rawError: "Regrese al inicio por información.",
                    url: "/login"
                }
            });



        });
    },

    perfil: function (req, res) {

            Cliente.findOne({
                id: req.session.credencialSegura
            }).exec(function (errorInesperado, ClienteEncontrado) {

                if (errorInesperado) {
                    return res.view('Error', {
                        error: {
                            desripcion: "Error inesperado del servidor",
                            rawError: errorInesperado,
                            url: "/login"
                        }
                    });
                }
                if (ClienteEncontrado) {

                    return res.view('cliente/show/', {
                        element: {
                            dni: ClienteEncontrado.dni,
                            nombre_cliente: ClienteEncontrado.nombre_cliente,
                            correo: ClienteEncontrado.correo,
                            telefono: ClienteEncontrado.telefono
                        }
                    });

                } else {

                    return res.view('Error', {
                        error: {
                            desripcion: "No se encontro al Cliente",
                            rawError: "No existe Cliente",
                            url: "/login"
                        }
                    });
                }
            })




        }
        //    DONE - Validar si envian parametros

    //    DONE - Buscar por correo al Cliente

    //    Comparar el password

    //    Entregar credencial









};