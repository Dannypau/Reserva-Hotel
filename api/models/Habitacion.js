/**
	Generated by sails-inverse-model
	Date:Fri Feb 17 2017 18:54:32 GMT-0500 (SA Pacific Standard Time)
*/

module.exports = {
    autoUpdatedAt: false,
    autoCreatedAt: false,
    attributes: {
        numero_piso: {
            type: 'integer',
            required: false
        },
        jacuzzi: {
            type: 'boolean',
            required: true
        },
        vista_mar: {
            type: 'boolean',
            required: true
        },
        precio: {
            type: 'float',
            required: true
        },
        habitaciones: {
            collection: 'reserva',
            via: 'reservas',
        }
    }
};
