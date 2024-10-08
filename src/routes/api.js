// aquí llegan todas las peticiones con url básica + /api, en vez de app ponemos router porque ya no estamos en el origne, el método Router() trae la url hasta aquí

const { checkToken } = require("../helpers/middlewares")

const router = require("express").Router()

// aquí llega la url básica + /api y le añadimos /diariofecha(o cualquier otro), recordamos que use es un comodín ya que abarca cualquier método

// CHECKTOKEN ESTÁ DESARROLLADO PARA VALIDAR A LOS USUARIOS, IRÍA JUSTO después de la coma "/" , checkToken, require()

// le añadimos /diariofecha y la mandamos a diariofecha.js
router.use("/diariofecha", require("./api/diariofecha"))

// le añadimos/destacados y lo mandamos a destacados.js
router.use("/destacados", require("./api/destacados"))

// le añadimos /laboratorio y lo mandamos a laboratorio.js
router.use("/laboratorio", require("./api/laboratorio"))

// añadimos /users y lo mandamos a users.js
router.use("/users", require("./api/users"))


module.exports = router