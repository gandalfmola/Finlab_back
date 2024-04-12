// nos traemos el laboratorio.model.js
const laboratorioModel = require("../models/laboratorio.model")

// importamos utils por si acaso
const utils = require("../helpers/utils")


async function getTramos(req, res) {
    // primero extraemos los parámetros de la url que se inyectaron desde el Front
    const { subida, lapso, beneficio } = req.params;
    console.log(subida);
    console.log(lapso);
    console.log(beneficio);

    const [ todo ] = await laboratorioModel.selectAllTramos();
    // console.log(todo);
    res.json(todo)
}





module.exports = { getTramos }