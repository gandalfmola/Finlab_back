// este método trae las 10 mayores subidas porcentuales desde el 01/03/2024
async function getBestSubidas() {
    return db.query("SELECT * FROM registro_diario WHERE fecha > '2024-03-01' ORDER BY variacion_porcentaje DESC LIMIT 10")
}

// este método trae las 10 mayores subidas con un intervalo seleccionado
async function getBestSubidasInt(fechaSeleccionada) {
    return db.query("SELECT * FROM registro_diario WHERE fecha >= ? ORDER BY variacion_porcentaje DESC LIMIT 10", [fechaSeleccionada])
}

// este método trae las 10 mayores bajadas
async function getBestBajadas() {
    return db.query("SELECT * FROM registro_diario WHERE fecha > '2024-03-01' ORDER BY variacion_porcentaje ASC LIMIT 10")
}

// este método trae las 10 mayores bajadas con un intervalo seleccionado
async function getBestBajadasInt(fechaSeleccionada) {
    return db.query("SELECT * FROM registro_diario WHERE fecha >= ? ORDER BY variacion_porcentaje ASC LIMIT 10", [fechaSeleccionada])
}





module.exports = { getBestSubidas, getBestBajadas, getBestSubidasInt, getBestBajadasInt }