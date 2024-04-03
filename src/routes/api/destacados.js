// el método Router() trae la url hasta aquí
const router = require("express").Router()

// nos traemos el controlador
const destacadosController = require("../../controllers/destacados.controller")


// RUTAS de /api/destacados

// esta coge los destacados con una fecha fija
router.get("/subidas", destacadosController.getDestacadosSub)

// esta coge los destacados con un intervalo
router.get("/subidas/:intervalo", destacadosController.getDestacadosSubInt)

// esta coge las mayores bajadas con fecha fija
router.get("/bajadas", destacadosController.getDestacadosBaj)

// esta coge las mayores bajadas con un intervalo
router.get("/bajadas/:intervalo", destacadosController.getDestacadosBajInt)


module.exports = router