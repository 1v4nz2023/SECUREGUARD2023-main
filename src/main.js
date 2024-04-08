const express = require('express');
const session = require('express-session');

const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

//SWAGGER

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


const swaggerSpec = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: "SECUREGUARD MONGODB API",
            version: "1.0.0"
        },
        servers:[
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./service/*.js")}`

    ]
}


const auth_Service = require('./service/auth_service');
const tokenvalidate_service = require('./service/tokenvalidate_service');
const userconfig_service = require('./service/userconfig_service');
const endsession_service = require('./service/endsession_service');
const regvisitas_service = require('./service/regvisitas_service');

const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
const secretKey = '0ca876e4fcec0f5689591903a9b41336';

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true
}));



app.use('/api', auth_Service);
app.use('/api', tokenvalidate_service);
app.use('/api', userconfig_service);
app.use('/api', endsession_service);
app.use('/api', regvisitas_service);




//Rutas
app.get('/', (req, res) => {
    res.send('Servicio iniciado');
})
mongoose
.connect(process.env.url_DataBase)
.then(() => console.log('Conectado a la base de datos'))
.catch((err) => console.log(err));

app.listen(port, () => 
console.log(`Se ha iniciado la aplicacion de NODE en el puerto: ${port}`));
