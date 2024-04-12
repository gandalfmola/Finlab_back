// este método extrae de la BBDD los tramos que coincidan con lo solicitado en el Front
async function selectAllTramos() {
    return db.query("SELECT * FROM finlab.registro_diario ORDER BY EMPRESA, fecha")
}





module.exports = { selectAllTramos }