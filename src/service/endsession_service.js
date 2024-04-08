const express = require("express");
require('dotenv').config();
const route = express.Router();
//solucion de cors - instalar dependencias cors
var cors = require("cors");
route.use(cors({origin:'*'}));
route.use(express.urlencoded({ extended: false })); //Esto es para formData
route.use(express.json());


/**
 * @swagger
 * /api/logout:
 *  post:
 *      summary: cerrar sesion
 *      tags: [User]
 *      responses:
 *       200:
 *        description: cerraste sesion
 */
route.post('/logout', (req, res) => {
    // Destruir la sesión al cerrar sesión
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ mensaje: 'Error al cerrar sesión', error: err });
        } else {
            res.json({ mensaje: 'Cierre de sesión exitoso' });
        }
    });
});

module.exports = route;