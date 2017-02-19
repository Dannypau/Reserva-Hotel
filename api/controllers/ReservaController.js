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
        var parametros = req.allParams();
        Habitacion.find(parametros.id_hab).exec(function(err, habitaciones) { //busca las habitaciones
            if (err) {
                return next(err);
            }
            //crear la reserva
            Reserva.create({
                id_cliente: parametros.id_cliente,
                habitaciones: habitaciones,
                fecha_reserva: parametros.fecha_reserva,
                fecha_inicio: parametros.fecha_inicio,
                fecha_fin: parametros.fecha_fin,
                desayuno: parametros.desayuno,
                costo_total: parametros.costo_total,
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
    },
      script: function(req, res, next) {
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
      }
};
