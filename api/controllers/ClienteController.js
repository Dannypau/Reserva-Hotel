/**
 * Cliente
 *
 * @description :: Server-side logic for managing Cliente
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Passwords = require('machinepack-passwords');
module.exports = {
    index: function (req, res, next) {
        Cliente.find().exec(function (err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function (req, res, next) {
        Cliente.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function (req, res, next) {
        Cliente.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function (req, res, next) {
        Cliente.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('cliente/show/' + req.param('id'));
        });
    },

    delete: function (req, res, next) {
        Cliente.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/cliente');
        });
    },
    crearCliente: function (req, res) {

        if (req.method == "POST") {

            var parametros = req.allParams();

            if (parametros.nombre_cliente && parametros.correo && parametros.dni && parametros.password) {



                Passwords.encryptPassword({
                    password: parametros.password,
                }).exec({
                    // An unexpected error occurred.
                    error: function (err) {
                        if (err) {
                            return res.view('¡Error', {
                                error: {
                                    desripcion: "Fallo password",
                                    rawError: err,
                                    url: "/registrarCliente"
                                }

                            });
                        }
                    },
                    // OK.
                    success: function (result) {
                        var ClienteCrear = {
                            dni: parametros.dni,
                            password: result,
                            nombre_cliente: parametros.nombre_cliente,
                            correo: parametros.correo,
                            telefono: parametros.telefono
                        }
                        Cliente.create(ClienteCrear).exec(function (err, ClienteCreado) {

                            if (err) {
                                return res.view('Error', {
                                    error: {
                                        desripcion: "Fallo al crear el Cliente",
                                        rawError: err,
                                        url: "/registrarCliente"
                                    }

                                });
                            }

                            res.view('Exito', {
                                exito: {
                                    desripcion: "Registro existoso.",
                                    rawExito: "Por favor, inicie sesión para empezar.",
                                    url: "/login"
                                }
                            });

                        })

                    },
                });

                //
            } else {

                return res.view('Error', {
                    error: {
                        desripcion: "Llena todos los parametros, apellidos y nombres",
                        rawError: "Fallo en envio de parametros",
                        url: "/registrarCliente"
                    }

                });

            }


        } else {

            return res.view('Error', {
                error: {
                    desripcion: "Error en el uso del Metodo HTTP",
                    rawError: "HTTP Invalido",
                    url: "/registrarCliente"
                }
            });

        }

    }

};