// importamos la librería dayjs para dar formato a las fechas
const dayjs = require("dayjs")

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

async function getDestacadosSubInt(req, res) {
    try {
        // primero rescatamos el parámetro que contiene el intervalo seleccionado
        const {intervalo} = req.params;
        console.log(intervalo);

        // aquí probamos con timestamp para captuar la fecha en milisengundos y poder hacer cálculos de fechas
        const fechaActual = Date.now()
        console.log(fechaActual);   
        // convertimos la fecha actual a miliseg y le restamos el intervalo seleccionado por los miliseg que tiene cada día     
        const fechaPreparada = dayjs(fechaActual - (intervalo * 86400000)).format("YYYY-MM-DD")
        console.log(fechaPreparada);
        // ahora nos traemos las subidas mas destacadas desde la fecha actual menos el intervalo seleccionado
        const [registros] = await destacadosModel.getBestSubidasInt(fechaPreparada);
        console.log(registros);
        res.json(registros)

    } catch(error) {
        res.json({ descalabroTotal: error.message })
    }
}

async function getDestacadosBajInt(req, res) {
    try {
        // primero rescatamos el parámetro que contiene el intervalo seleccionado
        const {intervalo} = req.params;
        console.log(intervalo);

        // aquí probamos con timestamp para captuar la fecha en milisengundos y poder hacer cálculos de fechas
        const fechaActual = Date.now()
        console.log(fechaActual);   
        // convertimos la fecha actual a miliseg y le restamos el intervalo seleccionado por los miliseg que tiene cada día     
        const fechaPreparada = dayjs(fechaActual - (intervalo * 86400000)).format("YYYY-MM-DD")
        console.log(fechaPreparada);
        // ahora nos traemos las bajadas mas destacadas desde la fecha actual menos el intervalo seleccionado
        const [registros] = await destacadosModel.getBestBajadasInt(fechaPreparada);
        console.log(registros);
        res.json(registros)

    } catch(error) {
        res.json({ terror: error.message })
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



module.exports = { getDestacadosSub, getDestacadosBaj, getDestacadosSubInt, getDestacadosBajInt }