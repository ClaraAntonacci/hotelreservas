const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    try {

        const quarto = await prisma.quarto.create({
            data: req.body
        });

        res.status(201).json(quarto);

    } catch (error) {
        res.status(500).json(error);
    }
};

const listar = async (req, res) => {
    try {

        const quartos = await prisma.quarto.findMany({
            orderBy: {
                numero: "asc"
            }
        });

        res.status(200).json(quartos);

    } catch (error) {
        res.status(500).json(error);
    }
};

const buscar = async (req, res) => {
    try {

        const { id } = req.params;

        const quarto = await prisma.quarto.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                reservas: true
            }
        });

        res.status(200).json(quarto);

    } catch (error) {
        res.status(500).json(error);
    }
};

const excluir = async (req, res) => {
    try {

        const { id } = req.params;

        const quarto = await prisma.quarto.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(200).json(quarto);

    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    excluir
};