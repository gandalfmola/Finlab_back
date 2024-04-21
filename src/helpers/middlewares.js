/**********  CHECKTOKEN  **********/
// este middleware verifica que los usuarios estén registrados y hayan hecho el login correctamente para obtener el token de acceso

// importamos jsonwebtoken
const jwt = require("jsonwebtoken")

// importamos el model
const userModel = require("../models/users.model")

// vamos a añadir mas de un return para que la ejecución se dentega ahí
async function checkToken(req, res, next) {
    // primero comprobamos si el token viene incluido en la cabecera de authorization, si no está lanzamos un mensaje de error
    if (!req.headers["authorization"]) {
        return res.json({ problema: "Necesitas la cabecera de Authorization" })
    }

    // si está la cabecera e incluye el token lo capturamos
    const token = req.headers["authorization"]

    // creamos el payload fuera del try para poder utilizarlo también fuera de ese ámbito
    let payload;


    // ahora con jwt vamos a comprobar si el token es correcto, como primer parámetro metemos el token y como segundo la secret key del .env
    try {
        payload = jwt.verify(token, process.env.SECRET_KEY)
        // payload contiene el token descodificado
    } catch(error) {
        return res.json({ problema: error.message })
    }

    // recuperamos el usuario que envía la petición para poder guardarlo, tenemos su id en el payload (al crear createToken decidimos guardar el id, el rol y el plazo de expiración) 
    const [result] = await userModel.selectUserById(payload.users_id)
    console.log("esto es result en el middleware", result);
    // creamos una nueva clave para alamacenar el usuario que se ha logado
    req.user = result[0]

    // si llegamos aquí es que todo ha ido bien, el token estaba en la cabecera authorization y además era correcto, por ello permitimos que la petición siga adelante
    next()

}


module.exports = { checkToken }