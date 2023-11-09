const {Schema, model} = require("mongoose");

const ArticlesSchema = Schema({
  titulo:{
    type: String,
    require: true
  },
  contenido:{
    type: String,
    require: true
  },
  fecha:{
    type: String,
    default: Date.now
  },
  image:{
    type: String,
    default: "default.png"
  },
})

module.exports = model("Articles", ArticlesSchema);
