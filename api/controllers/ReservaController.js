/**
 * Reserva
 *
 * @description :: Server-side logic for managing Reserva
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: function(req, res, next) {
        Reserva.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Reserva.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Reserva.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Reserva.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('reserva/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Reserva.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/reserva');
        });
    },
    buscar: function(req, res, next) {
        Reserva.find({
                fecha_inicio: {
                    '>=': new Date(req.param('fecha_inicio')),
                },
                fecha_fin: {
                    '<=': new Date(req.param('fecha_fin'))
                }
            })
            .populate('habitaciones')
            .exec(function(err, habitaciones) {
                if (err) {
                    return next(err);
                }
                sails.log.info('regresando habitaciones');
                sails.log.info(habitaciones);
                return habitaciones;
                sails.log.info('habitaciones regresadas');
            });
    },
    crear: function(req, res, next) {
        var parametros = req.allParams();
        Habitacion.find(parametros.id_hab).exec(function(err, habitaciones) {
            if (err) {
                return next(err);
            }
            //crear la reserva
            Reserva.create({
                id_cliente: parametros.id_cliente,
                habitaciones: habitaciones
            }).exec(function(err, reserva) {
                if (err) {
                    return next(err);
                }
                //aloja a los huespedes                                
                var huespedes = parametros.nombre_huesped,
                    dnis = parametros.dni;
                for (var i in huespedes) {
                    Huesped.create({
                        nombre_huesped: huespedes[i],
                        dni: dnis[i],
                        id_reserva: reserva.id
                    }).exec(function(err, huesped) {
                        if (err) {
                            return next(err);
                        }
                        reserva.huespedes.add(huesped);
                    })
                }
                return res.redirect('/');
            })

        })
    }
};
