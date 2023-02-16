const { response } = require('express');
const { Pagos } = require('../models');
const Stripe = require('stripe')

const guardarPago = async(req, res = response ) => {

    const { amount, id, productos, envio, metodo } = req.body
    const usuario = req.usuario._id
    const stripe = new Stripe(process.env.SECRETSTRIPEKEY)

    try {

        const resp = await stripe.paymentIntents.create({
            amount,
            payment_method: id,
            currency: 'ARS',
            description: 'Productos varios',
        })

        const data = {
            usuario,
            productos,
            monto: amount / 100,
            envio,
            metodo
        }

        let nuevoPago = ''
        try {
            const pago = new Pagos( data );
            nuevoPago = await pago.save();
        } catch (error) {
            console.log(error)
        }

        res.status(201).json( {id: resp.id, status: resp.status, idDB: nuevoPago._id}  );

    } catch (error) {
        console.log(amount)
        res.status(201).json( error );
    }

}

const confirmarPago = async(req, res = response ) => {

    const { amount, id, idDB } = req.body
    const stripe = new Stripe(process.env.SECRETSTRIPEKEY)

    try {
        const resp  = await stripe.paymentIntents.confirm(id)
        const pago = await Pagos.findByIdAndUpdate(idDB, {estado: 'Completa'});
        res.status(201).json(resp);

    } catch (error) {
        console.log(amount)
        res.status(201).json( error );
    }

}

const guardarPagoEfectivo = async(req, res = response ) => {

    const { amount, productos, envio, metodo } = req.body
    const usuario = req.usuario._id
    try {

        const data = {
            usuario,
            productos,
            monto: amount / 100,
            envio,
            metodo,
            estado: 'A pagar'
        }

        let nuevoPago = ''
        try {
            const pago = new Pagos( data );
            nuevoPago = await pago.save();
        } catch (error) {
            console.log(error)
        }

        res.status(201).json( {status: 'succeeded', idDB: nuevoPago._id}  );

    } catch (error) {
        console.log(amount)
        res.status(201).json( error );
    }

}

const guardarPagoEfectivoInvitado = async(req, res = response ) => {

    const { amount, productos, envio, metodo, invitado } = req.body
    try {

        const data = {
            usuario: null,
            productos,
            monto: amount / 100,
            envio,
            metodo,
            estado: 'A pagar',
            invitado: Object.keys(invitado)
        }

        let nuevoPago = ''
        try {
            const pago = new Pagos( data );
            nuevoPago = await pago.save();
        } catch (error) {
            console.log(error)
        }

        res.status(201).json( {status: 'succeeded', idDB: nuevoPago._id}  );

    } catch (error) {
        console.log(amount)
        res.status(201).json( error );
    }

}

const getCompras = async(req, res = response ) => {

    const { id } = req.usuario;

    const [ total, compras ] = await Promise.all([
        Pagos.countDocuments(),
        Pagos.find({ usuario: id })
        .populate('productos')
        .sort({createdAt: 'descending'})
    ]);

    res.status(201).json({
        compras,
        total,
    });

}


module.exports = {
    guardarPago,
    confirmarPago,
    guardarPagoEfectivo,
    guardarPagoEfectivoInvitado,
    getCompras
}