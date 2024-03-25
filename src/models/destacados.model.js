// este método trae las 10 mayores subidas porcentuales desde el 01/03/2024
async function getBestSubidas() {
    return db.query("SELECT * FROM registro_diario WHERE fecha > '2024-03-01' ORDER BY variacion_porcentaje DESC LIMIT 10")
}

async function getBestBajadas() {
    return db.query("SELECT * FROM registro_diario WHERE fecha > '2024-03-01' ORDER BY variacion_porcentaje ASC LIMIT 10")
}





module.exports = { getBestSubidas, getBestBajadas }