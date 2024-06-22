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
    // console.log(todo[0]);
    // console.log(todo[20000]);
    // console.log(todo[30000]);
    // console.log(todo[40000]);
    const arrSubidas = utils.findTramos(todo, subida, lapso, beneficio)
    console.log("Esto es arrSubidas",arrSubidas);
    for (let subida of arrSubidas[0]) {
        console.log(typeof subida);
    }
    
    console.log("Longitud arrSubidas",arrSubidas.length);
    
    // console.log(todo);
    res.json(arrSubidas)
}





module.exports = { getTramos }