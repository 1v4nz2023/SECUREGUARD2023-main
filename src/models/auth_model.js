const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const authenticate = new mongoose.Schema(
{
  nombres: {
    type: String,
    required: true,
  },

  correo: {
    type: String,
    required: true,
  },

  dni: {
    type: Number,
    required: true,
  },

  telefono: {
    type: Number,
    required: true,
  },
  
   usuario: {
    type: String,
    required: true,
    unique: true,
  },

  contraseña: {
    type: String,
    required: true,
  },

  imagenURL:{
    type: String,
    required: false,
  },

  fotoperfil:{
    type: String,
    required: false,
  },

  rol:{
    type: String,
    required: true,
  }

},

{
    versionKey: false, 
  }
);


module.exports = mongoose.model("auth", authenticate);


