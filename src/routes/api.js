// aquí llegan todas las peticiones con url básica + /api, en vez de app ponemos router porque ya no estamos en el origne, el método Router() trae la url hasta aquí

const router = require("express").Router()

// aquí llega la url básica + /api y le añadimos /diario(o cualquier otro), recordamos que use es un comodín ya que abarca cualquier método

// le añadimos /diario y la mandamos a diario.js
router.use("/diario", require("./api/diario"))

// le añadimos /diariofecha y la mandamos a diariofecha.js
router.use("/diariofecha", require("./api/diariofecha"))


module.exports = router