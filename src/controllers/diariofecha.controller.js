// importamos el model
const diarioFechaModel = require("../models/diariofecha.model")

// importamos el utils
const utils = require("../helpers/utils")


async function getDay(req, res) {
    try {
        // nos traemos la fecha
        const {fecha} = req.params;              

        // nos traemos las fechas que ya están registradas
        const [fechas] = await diarioFechaModel.getRegistroFechas();
        const arrFechasRegistradas = utils.preparaDates(fechas)
            
        
        // comprobamos si la nueva fecha ya está en la tabla de dias_inscritos
        const veredicto = arrFechasRegistradas.includes(fecha)
        console.log(veredicto);

        // si ya fecha no está registrada inscribimos ese día entero en registro_diario

        if (veredicto === false) {            

            // metemos en diario el resultado de consultar a la API
            console.log(fecha);
            const diario = await diarioFechaModel.callApi(fecha);
            // sacamos la parte útil de la consulta            
            const diarioProcesable = diario.data.results 

                  
            // acortamos la consulta solo a las empresas que nos interesan
            const todoListo = utils.puleResultados(diarioProcesable)            
            console.log("Esta es la longitud del listado: ", todoListo.length);

            
            // ESTO SOLO SE HIZO PARA EXTRAER LAS EMPRESAS INTERESANTES EN LA BBDD
            // extraemos las iniciales de las empresas que nos interesan
            // const interesantes = utils.extraeFechas(todoListo)
            // las insertamos en la tabla empresas_interesantes
            // for (let empresa of interesantes) {
            //     await diarioFechaModel.setInteresantes(empresa)
            // }
            
            
            // registramos todas las entradas del diario en la BBDD
            for (let elemento of todoListo) {
                
                await diarioFechaModel.registerDay(utils.preparaDiario(elemento, fecha));
            }

            // insertamos la fecha en la tabla dias_inscritos
            const result = await diarioFechaModel.insertFecha(fecha);
           

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


async function consultaDia(req, res) {
    try {
        const [result] = await diarioFechaModel.getAllDiario()
        console.log(result);
        res.json(result)

    } catch(error) {
        res.json({ descalabro: error.message })
    }
}

async function consultaDiaPaginado(req, res) {
    try {
        const [result] = await diarioFechaModel.getSomeDiario();
        res.json(result)
    } catch(error) {
        res.json({ fatal: error.message })
    }
}

async function allInteresantes(req, res) {
    try {
        const [result] = await diarioFechaModel.getInteresantesBBDD()
        console.log(result);
        let prueba = utils.extraeEmpresas(result)
        console.log(prueba);
        console.log(typeof prueba);
        console.log(typeof prueba[0]);
        
        res.json(result)
    } catch(error) {
        res.json({fatal: error.message})
    }
}





module.exports = { getDay, consultaDia, allInteresantes, consultaDiaPaginado }