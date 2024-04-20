// nos traemos el model
const usersModel = require("../models/users.model")

// importamos también el fichero utils con el método createToken
const utils = require("../helpers/utils")

// importamos la librería para encriptar los password
const bcrypt = require("bcryptjs")


// comenzamos con el método para crear un usuario
async function createUser(req, res) {

    try {
        // el primer parámetro son los datos del user, el segundo es el número de veces que queremos que se aplique el algoritmo de encriptación
        req.body.password = bcrypt.hashSync(req.body.password, 5)
        console.log(req.body);

        const [result] = await usersModel.insertUser(req.body)
        res.json(result)

    } catch(error) {
        res.json({ fatal: error.message })
    }

}

async function getAllUsers(req, res) {
    try {
        const [resultado] = await usersModel.selectAllUsers();
        res.json(resultado)
    } catch(error) {
        res.json({ problema: error.message })
    }
}

async function usersLogin(req, res) {
    try {
        const { email, password } = req.body
        const [resultado] = await usersModel.selectAllUsers()
        console.log(resultado);
        res.json({
            success: "LOGIN CORRECTO",
            token: utils.createToken(resultado[0])
        })
    } catch(error) {
        res.json({ problema: error.message })
    }
}


async function getUserById(req, res) {
    try {
        // rescatamos el id que va en la url
        const userId = req.params
        console.log("esto es userId",userId);
        const [result] = await usersModel.selectUserById(Number(userId["userid"]))
        res.json(result)



    } catch(error) {
        res.json({ problema: error.message })
    }
}



// exportamos los métodos
module.exports = { createUser, getAllUsers, usersLogin, getUserById }