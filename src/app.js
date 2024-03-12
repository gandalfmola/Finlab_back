// Creamos y configuramos la app de Express
// Es la que se encarga de la gestión de las rutas

// Importamos Express
const express = require("express")

// creamos la aplicación
const app = express()

// metemos el método para poder leer archivos json
app.use(express.json())

// importamos cors para poder usar los 2 servidores a la vez(back y front)
const cors = require("cors")
// metemos el método para usar cors
app.use(cors())




// MAPA DE RUTAS
// vamos a mandar a api.js todo lo que lleva urb básica + /api 
app.use("/api", require("./routes/api"))


// exportamos la aplicación
module.exports = app