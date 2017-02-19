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
                            return res.view('cliente/show/', {
                                element: {
                                    dni: ClienteEncontrado.dni,
                                    nombre_cliente: ClienteEncontrado.nombre_cliente,
                                    correo: ClienteEncontrado.correo,
                                    telefono: ClienteEncontrado.telefono
                                }
                            });
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






    }

    //    DONE - Validar si envian parametros

    //    DONE - Buscar por correo al Cliente

    //    Comparar el password

    //    Entregar credencial









};