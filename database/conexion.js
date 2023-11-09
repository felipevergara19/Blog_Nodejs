const mongoose = require("mongoose");

const conexion = async() =>{

  try{
    await mongoose.connect("mongodb://127.0.0.1:27017/my_blog");
    // Parametros dentro de objeto
    console.log("Conectado correctamente a my_blog")
  }catch(error){
    console.log(error);
    throw new Error("No se ha podido conectar a la abse de datos");
  }
}

module.exports ={
  conexion
}