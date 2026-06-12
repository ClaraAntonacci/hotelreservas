const express = require("express");

const router = express.Router();

const { 
    cadastrar, 
    listarPorQuarto, 
    excluir } = require("../controllers/reserva.controller");

router.post("/cadastrar", cadastrar);
router.get("/quarto/:quartoId", listarPorQuarto);
router.delete("/excluir/:id", excluir);

module.exports = router;
