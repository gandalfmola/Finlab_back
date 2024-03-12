// Creamos y configuramos el Servidor

// Importamos la librería http
const http = require("http")
// creamos la app
const app = require("./src/app")


// importamos dotenv para que funcione el .env
require("dotenv").config()

// configuramos la BBDD para poder interactuar con ella
require("./src/config/db")


// Creamos el servidor
const server = http.createServer(app)


// Configuramos el puerto por defecto
const PORT = process.env.PORT || 3000;

// Ponemos el servidor a escuchar
server.listen(PORT);

// Nos suscribimos a los listeners
// listening para saber CUANDO se ha puesto a escuchar, te avisa lanzando el console.log que le has indicado
server.on("listening", () => {
    console.log(`Mi servidor FINLAB está escuchando en el puerto ${PORT}`)
})
// error para que me avise si hay un error al imprimir ese console.log
server.on("error", (error) => {
    console.log(error)
})
