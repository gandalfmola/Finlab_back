// importamos axios
const axios = require("axios")

// const key = "VQEPT3JUSG58HW7X"
const key = "xRfdexoBspV70bTEQEdZAryTbQnOAoBQ"
const fecha = "2022-03-01"

// este método solo devuelve la fecha que se está consultando
function getDate() {
    return fecha
}

// este método trae los datos de una empresa
async function callApi() {
    try {       

        const response = await axios.get(`https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${fecha}?adjusted=true&apiKey=${key}`);

        return response

    } catch (error) {
        console.log(error.message);
    }
}

// este método registra en la BBDD el informe diario una vez que ha sido procesado
async function registerDay([empresa,valor_apertura, max, min, valor_cierre,variacion_neta,variacion_porcentaje]) {
    return db.query("INSERT INTO registro_diario (empresa, valor_apertura, max, min, valor_cierre,variacion_neta,variacion_porcentaje, fecha) VALUES (?,?,?,?,?,?,?,?)", [empresa,valor_apertura, max, min, valor_cierre,variacion_neta,variacion_porcentaje, fecha_dia=fecha])
}

// este método trae todas las fechas que hay en el diario
async function getRegistroFechas() {
    return db.query("SELECT fecha FROM dias_inscritos")
}

// este método inserta la fecha en la tabla dias_inscritos
async function insertFecha(fecha_insertar) {
    return db.query("INSERT INTO dias_inscritos (fecha) VALUES (?)", [fecha_insertar])
}

// este método comprueba si esa fecha ya está recogida en el diario
async function compruebaRegistro(fecha) {
    return db.query("SELECT fecha FROM dias_inscritos WHERE fecha = (?)", [fecha])
}




module.exports = { callApi, registerDay, getRegistroFechas, getDate, insertFecha }