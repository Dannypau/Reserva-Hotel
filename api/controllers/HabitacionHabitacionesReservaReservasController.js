/**
 * HabitacionHabitacionesReservaReservas
 *
 * @description :: Server-side logic for managing HabitacionHabitacionesReservaReservas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: function(req, res, next) {
        HabitacionHabitacionesReservaReservas.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        HabitacionHabitacionesReservaReservas.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        HabitacionHabitacionesReservaReservas.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        HabitacionHabitacionesReservaReservas.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('habitacionHabitacionesReservaReservas/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        HabitacionHabitacionesReservaReservas.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/habitacionHabitacionesReservaReservas');
        });
    },

};