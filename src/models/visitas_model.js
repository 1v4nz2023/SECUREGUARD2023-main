const mongoose = require('mongoose');



const regvisitas_service = new mongoose.Schema(
{
    usuario: {
        type: String,
        required: true,
      },

  nombres: {
    type: String,
    required: true,
  },

  apellidos: {
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
  
   fecha: {
    type: String,
    required: true,
  },

  hora: {
    type: String,
    required: true,
  },

  motivo:{
    type: String,
    required: true,
  },

},

{
    versionKey: false, 
  }
);


module.exports = mongoose.model("visitas", regvisitas_service);
