// importamos la librería mysql2
const mysql = require("mysql2")


// creamos la conexión
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})


// creamos una variable global para que nuestro pool sea accesible desde toda la aplicación
global.db = pool.promise()

// incluimos el promise para trabajar con promesas en vez de con callbacks(te ahorras el segundo parámetro)
// este fichero hay que importarlo en index.js