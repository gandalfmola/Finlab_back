// el método Router() trae la url hasta aquí
const router = require("express").Router()

// nos traemos el controlador
const destacadosController = require("../../controllers/destacados.controller")


// RUTAS de /api/destacados
router.get("/subidas", destacadosController.getDestacadosSub)

router.get("/bajadas", destacadosController.getDestacadosBaj)



module.exports = router