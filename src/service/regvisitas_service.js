const express = require("express");
const visitas = require("../models/visitas_model");
const delivery = require("../models/delivery_model");

const route = express.Router();
//solucion de cors - instalar dependencias cors
var cors = require("cors");
route.use(cors({origin:'*'}));
route.use(express.urlencoded({ extended: false })); //Esto es para formData
route.use(express.json());


//REGISTRAR VISITAS
/**
 * @swagger
 * /api/visitas:
 *  post:
 *      summary: registrar visitas
 *      tags: [Visitas]
 *      requestBody: 
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          $ref: '#/components/schemas/Visitas'
 *      responses:
 *       200:
 *        description: registro de visita exitoso
 */
route.post('/visitas', async (req, res) => {

const regvisitas = visitas(req.body);
 
regvisitas
.save()
.then(() => {

    res.json({mensaje: 'Registro de visita exitoso'});
    
}).catch((error) => {
    console.error(error);
    res.status(404).json({ mensaje: 'DNI duplicado' });

});

    
}   
    )


//REGISTRAR DELIVERYS
/**
 * @swagger
 * /api/delivery:
 *  post:
 *      summary: registrar delivery
 *      tags: [Delivery]
 *      requestBody: 
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          $ref: '#/components/schemas/Delivery'
 *      responses:
 *       200:
 *        description: registro de delivery exitoso
 */

route.post('/delivery', async (req, res) => {

    const regdelivery = delivery(req.body);
     
    regdelivery
    .save()
    .then(() => {
    
        res.json({mensaje: 'Registro de delivery exitoso'});
        
    }).catch((error) => {
        console.error(error);
    
    });
    
        
    }   
        )
    

//VER VISITAS
/** 
 * @swagger
 * /api/ver/visitas:
 *  get:
 *      summary: muestra las visitas registradas
 *      tags: [Visitas]
 *      responses:
 *          200:
 *              description: todas las visitas
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Visitas'
 */
route.get('/ver/visitas',async(req,res)=>{
visitas
.find()
.then((data)=> res.json(data))
.catch((error)=> 

{
    console.error(error);
});
})


//VER DELIVERYS
/** 
 * @swagger
 * /api/ver/deliverys:
 *  get:
 *      summary: muestra los deliverys programados
 *      tags: [Delivery]
 *      responses:
 *          200:
 *              description: todos los deliveries
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Delivery'
 */

route.get('/ver/deliverys',async(req,res)=>{
    delivery
    .find()
    .then((data)=> res.json(data))
    .catch((error)=> 
    
    {
        console.error(error);
    });
    })
    

module.exports = route;
