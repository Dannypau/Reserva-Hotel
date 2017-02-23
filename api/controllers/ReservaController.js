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
    crear: function(req, res, next) {
        if (req.param('desayuno')) {
            req.session.desayuno = true;
            req.session.costo_total = Number(req.session.costo_total) + 10 * Number(req.session.total_dias) * Number(req.session.num_huespedes);
        }
        if(req.session.num_huespedes==1){
          req.session.nombre_huesped=req.session.nombre_huesped.split();
        }

        Habitacion.find(req.session.id_hab).exec(function(err, habitaciones) { //busca las habitaciones
            if (err) {
              sails.log.info('error en la busqueda de habitaciones');
                return next(err);
            }
            //crear la reserva
            Reserva.create({
                id_cliente: req.session.credencialSegura,
                habitaciones: habitaciones,
                fecha_reserva: new Date(),
                fecha_inicio: req.session.fecha_inicio,
                fecha_fin: req.session.fecha_fin,
                desayuno: req.session.dasayuno,
                costo_total: req.session.costo_total,
            }).exec(function(err, reserva) {
                if (err) {
                  sails.log.info('error en la creacion de reservas');
                    return next(err);
                }
                var huespedes = req.session.nombre_huesped,
                    dnis = req.session.dni;
                for (var i in huespedes) {
                    Huesped.create({
                        nombre_huesped: huespedes[i],
                        dni: dnis[i],
                        id_reserva: reserva.id //id de la reserva
                    }).exec(function(err, huesped) {
                        if (err) {
                          sails.log.info('error en lac creacion de huespedes');
                            return next(err);
                        }
                        reserva.huespedes.add(huesped);
                    })
                }

                return res.redirect('/perfil');
            })

        })
    },
    //me manda a la vista de registrar huespedes
    registrarhuespedes: function(req, res) {
        var parametros = req.allParams();
        Habitacion.find({
            id: parametros.id_hab
        }).exec(function(err, habitaciones) {
            if (err) {
                return next(err);
            }
            var total = 0;
            for (var i in habitaciones) {
                total += habitaciones[i].precio * parametros.total_dias;
            }
            req.session.id_hab=parametros.id_hab;
            req.session.total_dias=parametros.total_dias;
            req.session.costo_total=total;
            return res.view('huesped/registrohuespedes');
        });
    },
    finalizar: function(req, res) {
        var parametros = req.allParams();
        req.session.nombre_huesped= parametros.nombre_huesped;
        req.session.dni= parametros.dni;
        return res.view('reserva/ResumenReserva');
    },
    probar: function(req, res) {
        parametros = req.allParams();
        if (req.param('desayuno')) {
            req.session.desayuno = true;
            req.session.costo_total = Number(req.session.costo_total) + 10 * req.session.total_dias * req.session.nombre_huesped.length;
        }
        todo={
          nombre_huesped : req.session.nombre_huesped,
          dni : req.session.dni,
          id_hab : req.session.id_hab,
          desayuno:req.session.desayuno,
          costo_total:req.session.costo_total,
          fecha_inicio: req.session.fecha_inicio,
          fecha_fin: req.session.fecha_fin
        }

        return res.json(todo);
    },
    autenticar:function(req,res){
      var parametros = req.allParams();
      req.session.nombre_huesped= parametros.nombre_huesped;
      req.session.dni= parametros.dni;
      return res.view('loginSession');
    }

    /*script: function(req, res, next) {
        var id_cliente = 1,
            id_hab = [11,12,13,14,15],
            fecha_reserva = new Date(),
            fecha_inicio = '11/11/11',
            fecha_fin = '12/12/12',
            desayuno = true,
            costo_total = 160,
            nombre_huesped = ['balurdo23', 'balurdo43'],
            dni = ['111', '222'];
        Habitacion.find(id_hab).exec(function(err, habitaciones) { //busca las habitaciones
            if (err) {
                return next(err);
            }
            //crear la reserva
            Reserva.create({
                id_cliente: id_cliente,
                habitaciones: habitaciones,
                fecha_reserva: fecha_reserva,
                fecha_inicio: fecha_inicio,
                fecha_fin: fecha_fin,
                desayuno: desayuno,
                costo_total: costo_total,
            }).exec(function(err, reserva) {
                if (err) {
                    return next(err);
                }
                //aloja a los huespedes
                var huespedes = nombre_huesped,
                    dnis = dni;
                for (var i in huespedes) {
                    Huesped.create({
                        nombre_huesped: huespedes[i],
                        dni: dnis[i],
                        id_reserva: reserva.id //id de la reserva
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
    }*/
};
