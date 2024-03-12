// importamos axios
const axios = require("axios")

// const key = "VQEPT3JUSG58HW7X"
const key = "xRfdexoBspV70bTEQEdZAryTbQnOAoBQ"
// const fecha = "2022-03-01"

// este método consulta a la BBDD y trae todo lo que haya en el diario
async function getAllDiario() {
    return db.query("SELECT * FROM registro_diario ORDER BY fecha ASC")
}

// este método trae los datos de una empresa
async function callApi(fechita) {
    try {       
        // console.log("fecha en models: ", typeof fecha, fecha);
        const response = await axios.get(`https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${fechita}?adjusted=true&apiKey=${key}`);

        return response

    } catch (error) {
        console.log(error.message);
    }
}

// este método registra en la BBDD el informe diario una vez que ha sido procesado
async function registerDay([empresa,valor_apertura, max, min, valor_cierre,variacion_neta,variacion_porcentaje, fecha]) {
    return db.query("INSERT INTO registro_diario (empresa, valor_apertura, max, min, valor_cierre,variacion_neta,variacion_porcentaje, fecha) VALUES (?,?,?,?,?,?,?,?)", [empresa,valor_apertura, max, min, valor_cierre,variacion_neta,variacion_porcentaje, fecha])
}

// este método trae todas las fechas que hay en el diario
async function getRegistroFechas() {
    return db.query("SELECT fecha FROM dias_inscritos")
}

// este método inserta la fecha en la tabla dias_inscritos
async function insertFecha(fecha_insertar) {
    return db.query("INSERT INTO dias_inscritos (fecha) VALUES (?)", [fecha_insertar])
}

async function getInteresantes() {
    return db.query("SELECT iniciales FROM empresas_interesantes interesantes")
}

async function setInteresantes(empresa) {
    return db.query("INSERT INTO empresas_interesantes (iniciales) VALUES(?)", [empresa])
}

// esta función se trae las empresas interesantes de la BBDD
async function getInteresantesBBDD() {
    return db.query("SELECT iniciales FROM empresas_interesantes")
}



module.exports = { callApi, registerDay, getRegistroFechas, insertFecha, getAllDiario, setInteresantes, getInteresantes, getInteresantesBBDD }