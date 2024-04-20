// repasamos como meter parámetros en forma de objeto, es útil cuando son bastantes parámetros
function insertUser({ nombre, email, password, rol }) {
    return db.query("INSERT INTO usuarios (nombre, email, password, rol) VALUES (?,?,?,?)", [nombre, email, password, rol])
}

function selectAllUsers() {
    return db.query("SELECT * FROM usuarios")
}

function selectUserById(userId) {
    return db.query("SELECT * FROM usuarios WHERE id = ?", [userId])
}



module.exports = { insertUser, selectAllUsers, selectUserById }