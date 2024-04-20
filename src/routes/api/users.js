// importamos el router para traer la URL hasta aquí
const router = require("express").Router()

// nos traemos el controller
const usersController = require("../../controllers/users.controller")

 // creamos las rutas de users, aquí llega URL básica + /api + /users

 router.post("/new", usersController.createUser)

 router.get("/", usersController.getAllUsers)

 router.post("/login", usersController.usersLogin)

 router.get("/:userid", usersController.getUserById)



 // exportamos el router
 module.exports = router