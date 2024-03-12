// importamos el model
const diarioModel = require("../models/diario.model")

// importamos el utils
const utils = require("../helpers/utils")


async function getDay(req, res) {
    try {
        // nos traemos la fecha
        const fecha = diarioModel.getDate()
        console.log("Esto es fecha");
        console.log(fecha);
        console.log(typeof fecha);        

        // nos traemos las fechas que ya están registradas
        const [fechas] = await diarioModel.getRegistroFechas();
        const arrFechasRegistradas = utils.preparaDates(fechas)
        console.log("esto es fechas");        
        console.log(arrFechasRegistradas);     
        
        // comprobamos si la nueva fecha ya está en la tabla de dias_inscritos
        const veredicto = arrFechasRegistradas.includes(fecha)
        console.log(veredicto);

        // si ya fecha no está registrada inscribimos ese día entero en registro_diario

        if (veredicto === false) {
            // insertamos la fecha en la tabla dias_inscritos
            const result = await diarioModel.insertFecha(fecha);

            // metemos en diario el resultado de consultar a la API
            const diario = await diarioModel.callApi();
            // sacamos la parte útil de la consulta
            const diarioProcesable = diario.data.results        
            // acortamos la consulta solo a las empresas que nos interesan
            const todoListo = utils.puleResultados(diarioProcesable)

            // registramos todas las entradas del diario en la BBDD
            for (let elemento of todoListo) {
                
                await diarioModel.registerDay(utils.preparaDiario(elemento));
            }

            // mostramos la respuesta en formato json
            res.json(todoListo)
            } else {
                res.json({ noinscrito: "día ya registrado" })
            }

        

    } catch (error) {
        console.log(error.message);
        res.json({ descalabro: error.message })
    }

} 





module.exports = { getDay }