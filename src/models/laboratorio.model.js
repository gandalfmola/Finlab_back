// este método extrae de la BBDD los tramos que coincidan con lo solicitado en el Front
async function selectAllTramos() {
    return db.query("SELECT * FROM finlab.registro_diario WHERE fecha between '2024-03-01' AND '2024-04-01' ORDER BY EMPRESA ASC, fecha")
}





module.exports = { selectAllTramos }