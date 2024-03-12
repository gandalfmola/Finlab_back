// recordamos que el método Router() trae la url hasta aquí
const router = require("express").Router()

// nos traemos el controlador
const diarioController = require("../../controllers/diario.controller")


// RUTAS de /api/diario
router.get("/", diarioController.getDay)




module.exports = router

