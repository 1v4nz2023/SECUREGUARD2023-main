const express = require("express");
require('dotenv').config();
const route = express.Router();
const authenticate = require("../models/auth_model");
//solucion de cors - instalar dependencias cors
var cors = require("cors");
route.use(cors({origin:'*'}));
route.use(express.urlencoded({ extended: false })); //Esto es para formData
route.use(express.json());



//ACTUALIZAR BD

/** 
 * @swagger
 * /api/login/{usuario}:
 *   put:
 *    summary: actualiza la foto de perfil del usuario seleccionado
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: usuario
 *        schema:
 *          type: string
 *        required: true
 *        description: busca por usuario
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *          description: foto cambiada
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      404:
 *          description: error al cambiar la foto
 */

route.put('/login/:usuario',(req, res)=>{
    const {usuario} = req.params;
    const {imagenURL, contraseña, correo, dni, telefono, nombres, fotoperfil,rol} = req.body;
    authenticate
    .updateOne({usuario: usuario}, {$set:{fotoperfil}})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error}));
});



//BORRAR BD
/** 
 * @swagger
 * /api/login/{usuario}:
 *   delete:
 *    summary: Elimina el usuario deseado
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: usuario
 *        schema:
 *          type: string
 *        required: true
 *        description: busca por usuario y borralo
 *    responses:
 *      200:
 *          description: usuario borrado
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      404:
 *          description: usuario no encontrado
 */


route.delete('/login/:usuario',(req, res)=>{
    const {usuario} = req.params;
    authenticate
    .deleteOne({usuario: usuario})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error}));
});



module.exports = route;