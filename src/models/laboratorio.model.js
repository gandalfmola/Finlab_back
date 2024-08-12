// este método extrae de la BBDD los tramos que coincidan con lo solicitado en el Front
async function selectAllTramos() {
    return db.query("SELECT * FROM finlab.registro_diario WHERE fecha between '2024-05-20' AND '2024-06-22' ORDER BY EMPRESA ASC, fecha")
}





module.exports = { selectAllTramos }