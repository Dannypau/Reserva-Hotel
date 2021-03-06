/**
 * Habitacion
 *
 * @description :: Server-side logic for managing Habitacion
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: function(req, res, next) {
        Habitacion.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Habitacion.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Habitacion.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Habitacion.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('habitacion/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Habitacion.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/habitacion');
        });
    },
    verdisponibles: function(req, res, next) {
        var parametros = req.allParams();
        Reserva.find({
            fecha_inicio: parametros.fecha_inicio,
            fecha_fin: parametros.fecha_fin
        }).populate('habitaciones').exec(function(err, reservas) {
            if (err) {
                sails.log.info('error al buscar las reservas');
                return next(err);
            }
            req.session.fecha_inicio=parametros.fecha_inicio;
            req.session.fecha_fin=parametros.fecha_fin;
            req.session.num_huespedes=parametros.num_huespedes;
            if (Object.keys(reservas).length != 0) { //si hay reservas en esa fecha
                var ocupadas = [];
                for (var i in reservas) {
                    aux = reservas[i].habitaciones;
                    for (var j in aux) {
                        if (aux[j].id) {
                            ocupadas.push(aux[j].id);
                        }
                    }
                }
                Habitacion.find({
                    id: {
                        '!': ocupadas
                    }
                }).exec(function(err, disponibles) {
                    if (err) {
                        sails.log.info('error al buscar las habitaciones');
                        return next(err);
                    }
                    return res.view('reserva/resultado', {
                        habitaciones: disponibles,
                        //no regresar
                    });
                })
            } else { //si no hay reservas en esas fechas
                Habitacion.find().exec(function(err, todas) {
                    if (err) {
                        sails.log.info('error al buscar las toditas');
                        return next(err);
                    }
                    return res.view('reserva/resultado', {
                        habitaciones: todas,
                        //no regresar
                    });
                });
            }
            //
        });
    }
};
