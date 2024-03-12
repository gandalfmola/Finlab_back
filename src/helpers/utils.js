const dayjs = require("dayjs")


// esta función convierte un objeto en un array de miniarrays
function preparaDay(objetoDay) {
    let resultado = []
    for (let clave in objetoDay) {
        resultado.push([clave,objetoDay[clave]])
    }    

    return resultado
}


// esta función convierte un array de objetos fecha:datetime en un array de  fecha:Date
function preparaDates(objetosFecha) {
    let resultado = []
    for (let elemento of objetosFecha) {
        let cadena = new Date(elemento["fecha"])
        let hola = dayjs(cadena).format("YYYY-MM-DD")
        // let hola = cadena.toLocaleDateString({"format":"dd-mm-yyyy"})
        resultado.push(hola)
        
    }    

    return resultado
}

// esta función recorre un array de objetos devolviendo un array de iniciales de empresas
function extraeFechas(arrObjetos) {
    let resultado = []
    for (let elemento of arrObjetos) {
        let fecha = elemento.T        
        resultado.push(fecha)        
    }    

    return resultado
}


// esta función convierte un array de objetos en un array de String
function extraeEmpresas(arrObjetos) {
    let resultado = []    
    
    for(let elemento of arrObjetos) {
        let fecha = elemento.iniciales
        resultado.push(fecha)
    }

    return resultado
}


// esta función recorre un objeto para buscar coindicencias del valor de la clave T con el array de empresas que quieres controlar, si coincide devuelve el objeto, si no devuelve false
// para añadir acciones de mas de cierto valor  || objeto["c"] > 250
function recorreObjeto(objeto) {
    const interesantes = ["WMT", "AMZN", "XOM", "AAPL", "UNH", "CVS", "PM", "GOOGL", "MCK", "CVX", "JPM", "MSFT", "ABC", "COST", "CAH", "CI", "MRO", "PSX", "VLO", "F", "HD", "GM", "ELV", "KR", "CNC", "VZ", "WBA", "FNMA", "CMCSA", "T", "META", "BAC", "TGT", "DELL", "ADM", "C", "UPS", "PFE", "LOW", "JNJ", "FDX", "HUM", "ET", "FMMC", "PEP", "WFC", "DIS", "COP", "TSLA", "P&G", "UPS", "GE", "MET", "GS", "SYY", "BG", "RTX", "BS", "SNEX", "LMT", "MSIM", "INTC", "HPQ", "SNX", "IBM", "HCA", "PRU", "CAT", "MRK", "EPD", "ABBV", "PAGP", "DOW", "AIG", "AXP", "OTC", "CHTR", "TSN", "DE", "CSCO", "DAL", "LMIE", "TJX", "PGR", "AAL", "CHS", "PFGC", "PBF", "NKE", "BBY", "BMY", "UAL", "TMO", "QCOM", "ABT", "KO", "ORCL", "NUE", "OXY", "MMM", "WBD", "SBUX", "UBER", "PM", "NFLX", "CRM", "PARA", "KMX"]

    for (let empresa of interesantes) {
        for (let clave in objeto) {
            if (objeto[clave] === empresa || objeto["c"] > 296) {
                return objeto
            }
        }

    }    

    return false

}

// esta función reduce un array de objetos para reducirlo solo a los elementos que nos interesan(empresas importantes, no tiene sentido trabajar con los 10.000 resultados), se apoya en la función recorreObjeto

function puleResultados(resultado) {        

    const resultadoReducido = []    

    for (let elemento of resultado) {
        
        if (recorreObjeto(elemento) !== false) {
            resultadoReducido.push(elemento)
        }
    }

    return resultadoReducido
}

// esta función recibe el diario y lo prepara para inscribirlo en la BBDD
function preparaDiario(objeto, fecha) {
    let resultado = []

    resultado.push(objeto["T"])
    resultado.push(objeto["o"])
    resultado.push(objeto["h"])
    resultado.push(objeto["l"])
    resultado.push(objeto["c"])
    resultado.push(objeto["c"] - objeto["o"])
    resultado.push(1 - (objeto["o"]/objeto["c"]))
    /**************** */
    resultado.push(fecha)
    /*********************/

    return resultado
}



module.exports = { preparaDay, recorreObjeto, puleResultados, preparaDiario, preparaDates, extraeFechas, extraeEmpresas }