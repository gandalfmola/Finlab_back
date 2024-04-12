// lo primero nos tramelos la url hasta aquí importando el router
const router = require("express").Router()

// nos traemos el controller
const laboratorioModel = require("../../controllers/laboratorio.controller")


// RUTAS DE api/laboratorio

// esta ruta va a devolver los tramos que cumplan los requisitos establecidos en el formulario del front
router.get("/seleccion/:subida/:lapso/:beneficio", laboratorioModel.getTramos)


module.exports = router