const mongoose = require('mongoose');



const delivery = new mongoose.Schema(
{
  usuario: {
    type: String,
    required: true,
  },
  
  empresa: {
    type: String,
    required: true,
  },

  vehiculo: {
    type: String,
    required: true,
  },

  contacto: {
    type: String,
    required: true,

  },

  fecha: {
    type: String,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  }
},

{
    versionKey: false, 
  }
);


module.exports = mongoose.model("delivery", delivery);
