// recordamos que el método Router() trae la url hasta aquí
const router = require("express").Router()

// nos traemos el controlador
const diarioFechaController = require("../../controllers/diariofecha.controller")


// RUTAS de /api/diariofecha
router.get("/", diarioFechaController.consultaDia)

router.get("/paginado", diarioFechaController.consultaDiaPaginado)

router.get("/eleccion/:fecha", diarioFechaController.getDay)

router.get("/empresas", diarioFechaController.allInteresantes)




module.exports = router

