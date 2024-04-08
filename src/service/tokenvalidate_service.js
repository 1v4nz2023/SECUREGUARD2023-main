const express = require("express");
require('dotenv').config();
const route = express.Router();
const jwt = require('jsonwebtoken');
//solucion de cors - instalar dependencias cors
var cors = require("cors");
route.use(cors({origin:'*'}));
route.use(express.urlencoded({ extended: false })); //Esto es para formData
route.use(express.json());


// Validamos el token
const verificarToken = (req, res, next) => {
    const token = req.header('auth-token')

    if (!token) {
        return res.status(403).json({ mensaje: 'Acceso denegado' });
    }

    try{
        const verificar = jwt.verify(token,process.env.SECRET)
        req.user = verificar
        next();

    } catch(error){
        res.status(401).json({ error: 'Token inválido' });
    
    }

};

// Ruta protegida

/** 
 * @swagger
 * /api/ruta-protegida:
 *  get:
 *      summary: middleware ruta protegida
 *      tags: [User]
 *      responses:
 *          200:
 *              description: valida token antes de iniciar sesion
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */


route.get('/ruta-protegida', verificarToken, (req, res) => {
    res.json({ 
        
        message: 'Acceso permitido',
        data: {
            alta:'OK',
            title:'mi ruta protegida',
            user: req.user
        }
    });
});

module.exports = route;