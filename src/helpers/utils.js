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
    
    const interesantes = ['NFLX','CACI','BIO','NKE','NRGU','CI','FDX','CAT','KO','JNJ','SPY','WMT','MCO','HCA','INTC','CACC','VOO','NOC','MKL','IBM','MDGL','TJX','GHC','REGN','CAH','LMT','ELV','GS','AZO','PH','COP','T','AULT','BRK.B','MPWR','BACpL','MET','WFC','GE','DOW','BMY','ORLY','ORCL','MSTR','DPZ','CHS','BRK.A','TSN','DECK','TMO','LULU','ABBV','ALGN','WFCpL','HUM','BAC','AMZN','USBpA','MRO','SPGI','VGT','HPQ','CRM','COKE','NUE','PARA','QQQ','UBER','BIIB','INTU','POOL','MA','QCOM','URI','KMX','MRK','LOW','UAL','PGR','AON','F','RTX','ODFL','PBF','MDY','ABC','CABO','PSX','CHE','MELI','TDG','IVV','EPD','AIG','VRTX','UPS','TPL','GOOGL','MKTX','SNEX','BKNG','PEP','AAL','SEB','AVGO','TGT','PFGC','WBA','ADM','GWW','SAM','PODD','LIN','VLO','TYL','PRU','COST','LRCX','VZ','MSFT','AAPL','HD','OXY','CHTR','AVTX','PEN','ADBE','MSCI','UNH','NOW','CSCO','KNSL','KR','GM','LLY','IDXX','MCK','ISRG','DIS','DIA','NEU','EQIX','SYY','IT','BLK','MMM','JPM','ARGX','CMCSA','DE','CVS',
    'BBY','SNX','META','PAGP','RE','TSLA','BG','KLAC','MTD','CNC','WBD','DAL','ABT','FCNCA','FICO','CTAS','PM','PFE','C','ASML','WSO','ET','FDS','MULN','NRGD','AXP','XOM','DELL','HUBS','MLM','ANSS','WINA','CVX','ULTA','NVR','SNPS','SBUX','GMBL','ROP','WST','BH.A','CMG','TDY','BIO.B','XELAP','FBGX','WTM','ATRI','ZTEST', 'NVDA']

    for (let empresa of interesantes) {
        for (let clave in objeto) {
            if (objeto[clave] === empresa) {
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

// esta función lleva la lógica para buscar tramos de subidas válidos
function findTramos(arrRegistros, subida, lapso, beneficio) {
    let comparativa = []
    const resultado = []
    let index = 0

    for (let registro of arrRegistros) {
        const empresa = registro.empresa
        const cierre = registro.valor_cierre
        comparativa.push(cierre)        

        if (index == lapso && findSubida(comparativa, subida)==true) {
            resultado.push(comparativa)
            comparativa = []
            index = 0
            continue;
        } else {
            index++
        }
    }

    return resultado
}

// esta función nos dice si un array de valores cumple el parámetro de subida porcentual que le indiquemos
function findSubida(arrCierres, subida) {    
    
    let referencia = arrCierres[0]

    for (let cierre of arrCierres) {
        if (getPorcentaje(referencia, cierre) >= subida) {
            return true
        } 
    }

    return false

}

// esta función calcula cual es la subida porcentual entre 2 cantidades
function getPorcentaje(num1, num2) {
    let resultado = 0;    
    resultado = ((num2/num1) -1) *100

    return resultado.toFixed(2)
}


module.exports = { preparaDay, recorreObjeto, puleResultados, preparaDiario, preparaDates, extraeFechas, extraeEmpresas, findTramos, findSubida, getPorcentaje }