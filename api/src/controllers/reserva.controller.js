const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    try {

        const reserva = await prisma.reserva.create({
            data: {
                hospede: req.body.hospede,
                dataEntrada: new Date(req.body.dataEntrada),
                dataSaida: new Date(req.body.dataSaida),
                quartoId: Number(req.body.quartoId)
            }
        });

        res.status(201).json(reserva);

    } catch (error) {
        res.status(500).json(error);
    }
};

const listarPorQuarto = async (req, res) => {
    try {

        const { quartoId } = req.params;

        const reservas = await prisma.reserva.findMany({
            where: {
                quartoId: Number(quartoId)
            }
        });

        res.status(200).json(reservas);

    } catch (error) {
        res.status(500).json(error);
    }
};

const excluir = async (req, res) => {
    try {

        const { id } = req.params;

        const reserva = await prisma.reserva.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(200).json(reserva);

    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    cadastrar,
    listarPorQuarto,
    excluir
};