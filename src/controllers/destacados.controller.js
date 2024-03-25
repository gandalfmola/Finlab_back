// lo primero nos traemos el model
const destacadosModel = require("../models/destacados.model")

// importamos utils por si acaso lo necesitamos
const utils = require("../helpers/utils")


async function getDestacadosSub(req, res) {
    try {

        // nos traemos las mayores subidas desde el 01/03/2024
        const [registros] = await destacadosModel.getBestSubidas();
        res.json(registros)

    } catch(error) {
        console.log(error.message);
        res.json({ descalabroTotal: error.message })
    }
}


async function getDestacadosBaj(req, res) {
    try {
        // nos traemos las mayores bajadas desde el 01/03/2024
        const [registros] = await destacadosModel.getBestBajadas();
        res.json(registros)

    } catch(error) {
        console.log(error.message);
        res.json({ fatal: error.message })
    }
}



module.exports = { getDestacadosSub, getDestacadosBaj }