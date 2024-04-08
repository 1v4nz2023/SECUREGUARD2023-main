const express = require("express");
const bcryptjs = require("bcryptjs");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const authenticate = require("../models/auth_model");
const session = require("express-session");

const route = express.Router();
const jwt = require("jsonwebtoken");
//solucion de cors - instalar dependencias cors
var cors = require("cors");
route.use(cors({ origin: "*" }));
route.use(express.urlencoded({ extended: false })); //Esto es para formData
route.use(express.json());
route.use(cookieParser());
route.use(
  session({
    secret: process.env.SECRET, // Cambia esto a una cadena de secreto más segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // En producción, configura a true si usas HTTPS
  })
);


// SWAGER SCHEMAS
//USUARIOS
/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *        type: object
 *        properties:
 *          nombres:
 *              type: string
 *              description: nombre de usuario
 *          correo:
 *              type: string
 *              description: correo de usuario
 *          dni:
 *              type: integer
 *              description: dni de usuario
 *          telefono:
 *              type: string
 *              description: telefono de usuario
 *          usuario:
 *              type: string
 *              description: usuario
 *          contraseña:
 *              type: string
 *              description: contraseña del usuario
 *          imagenURL:
 *              type: string
 *              description: foto del usuario por link
 *          fotoperfil:
 *              type: string
 *              description: foto dle usuario por img
 *          rol:
 *              type: string
 *              description: rol del usuario
 *
 *        required:
 *          - nombres
 *          - correo
 *          - dni 
 *          - telefono
 *          - usuario
 *          - contraseña
 *          - rol
 * 
 *        example:
 *          usuario: ivan1219
 *          contraseña: admin
 *          correo: ivanmera10@hotmail.com
 *          dni: 70550883
 *          telefono: 933298821
 *          nombres: Ivan Mera
 *          imagenURL:  none
 *          fotoperfil: none
 *          rol: admin
 */

//VISITAS

/**
 * @swagger
 * components:
 *  schemas:
 *      Visitas:
 *        type: object
 *        properties:
 *          usuario:
 *              type: string
 *              description: nombre de usuario
 *          nombres:
 *              type: string
 *              description: nombres de usuario
 *          apellidos:
 *              type: string
 *              description: apellidos de usuario
 *          dni:
 *              type: integer
 *              description: dni de usuario
 *          telefono:
 *              type: integer
 *              description: telefono de usuario
 *          fecha:
 *              type: string
 *              description: fecha de visita
 *          hora:
 *              type: string
 *              description: hora de visita
 *          motivo:
 *              type: string
 *              description: motivo de visita
 *
 *        required:
 *          - usuario
 *          - nombres
 *          - apellidos 
 *          - dni
 *          - telefono
 *          - fecha
 *          - hora
 *          - motivo 
 * 
 *        example:
 *          usuario: ivan1219
 *          nombres: sergio andre
 *          apellidos: mera ibarguen
 *          dni: 70550884
 *          telefono: 933298822
 *          fecha: 2023-11-30
 *          hora:  20:00
 *          motivo: visitas
 */

//DELIVERY

/**
 * @swagger
 * components:
 *  schemas:
 *      Delivery:
 *        type: object
 *        properties:
 *          usuario:
 *              type: string
 *              description: nombre de usuario
 *          empresa:
 *              type: string
 *              description: empresa visitante
 *          vehiculo:
 *              type: string
 *              description: tipo de vehiculo
 *          contacto:
 *              type: string
 *              description: nombre del delivery
 *          fecha:
 *              type: string
 *              description: fecha de delivery
 *          hora:
 *              type: string
 *              description: hora de delivery
 *
 *        required:
 *          - usuario
 *          - empresa
 *          - vehiculo 
 *          - contacto
 *          - fecha
 *          - hora
 * 
 *        example:
 *          usuario: ivan1219
 *          empresa: KFC
 *          vehiculo: Motorizado
 *          contacto: 70550884
 *          fecha: 2023-11-30
 *          hora:  20:00
 */

//REGISTRO

/**
 * @swagger
 * /api/registro:
 *  post:
 *      summary: crear usuarios
 *      tags: [User]
 *      requestBody: 
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          $ref: '#/components/schemas/User'
 *      responses:
 *       200:
 *        description: Usuario creado
 */


route.post("/registro", async (req, res) => {
  const {
    usuario,
    contraseña,
    correo,
    dni,
    telefono,
    nombres,
    imagenURL,
    fotoperfil,
    rol,
  } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = await authenticate.findOne({ usuario });
  if (existingUser) {
    return res.status(400).json({ mensaje: "El usuario ya existe" });
  }

  // Hashear la contraseña antes de guardarla en la base de datos
  const hashedPassword = bcryptjs.hashSync(contraseña, 10);

  // Crear un nuevo usuario
  const nuevoUsuario = new authenticate({
    usuario,
    contraseña: hashedPassword,
    correo,
    dni,
    telefono,
    nombres,
    imagenURL,
    fotoperfil,
    rol,
  });

  // Guardar el nuevo usuario en la base de datos
  nuevoUsuario
    .save()
    .then(() => {
      res.json({ mensaje: "Registro exitoso" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ mensaje: "Datos incompletos" });
    });
});




//LOGIN

/**
 * @swagger
 * /api/login:
 *  post:
 *      summary: iniciar sesion
 *      tags: [User]
 *      requestBody: 
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          $ref: '#/components/schemas/User'
 *      responses:
 *       200:
 *        description: Usuario logeado
 */

route.post("/login", async (req, res) => {
  try {
    const { usuario, contraseña, fotoperfil } = req.body;

    const user = await authenticate.findOne({ usuario });

    if (user && bcryptjs.compareSync(contraseña, user.contraseña)) {
      const token = jwt.sign({ usuario: user.usuario }, process.env.SECRET, {
        expiresIn: "30d",
      });
      // Almacenar información del usuario en la sesión
      req.session.user = {
        usuario: user.usuario,
        displayName: user.usuario,
        fotoperfil: fotoperfil,
      };

      // Devolver el token al cliente
      res.json({
        error: null,
        data: { token },
        displayName: user.usuario,
        imgURL: user.imagenURL,
        fotoperfil: user.fotoperfil,
      });
    } else {
      res.json({ mensaje: "Credenciales incorrectas" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
});

//CONSULTAR BD TODOS LOS USUARIOS


/** 
 * @swagger
 * /api/users:
 *  get:
 *      summary: muestra los usuarios
 *      tags: [User]
 *      responses:
 *          200:
 *              description: todos los usuarios
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */

route.get("/users", async function (req, res) {
  authenticate
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//CONSULTAR BD POR USUARIO

/** 
 * @swagger
 * /api/users/{usuario}:
 *   get:
 *    summary: muestra los usuarios por consulta de usuario
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: usuario
 *        schema:
 *          type: string
 *        required: true
 *        description: busca por usuario
 *    responses:
 *      200:
 *          description: usuario encontrado
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      404:
 *          description: usuario no encontrado
 */


route.get("/users/:usuario", async function (req, res) {
  const { usuario } = req.params;

  authenticate
    .findOne({ usuario: usuario })
    .then((data) => {
      if (data) {
        if (data.rol != "admin") {
          res.json({
            message: "noadmin",
            usuario: data.usuario,
            imagenURL: data.imagenURL,
            fotoperfil: data.fotoperfil,
          });
        } else {
          res.json({
            message: "Usuario encontrado",
            usuario: data.usuario,
            imagenURL: data.imagenURL,
            fotoperfil: data.fotoperfil,
          });
        }
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    })
    .catch((error) => res.status(500).json({ message: error }));
});

module.exports = route;
