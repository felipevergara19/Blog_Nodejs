const { conexion } = require("./database/conexion");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

//Inicializar app
console.log("App de node arrancada");
conexion();

//configurar Cors
app.use(cors());
//Convertir body a Objeto js
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//RUTAS
const rutas_article = require("./routes/Article");

//Cargo las rutas
app.use("/api", rutas_article);


//Rutas prueba
app.get("/probando", (req, res) => {
  console.log("se ha ejecutado el endpoint");

  return res.status(200).json({
    curso: "Master en Node",
  });
});

app.get("/", (req, res) => {
  console.log("se ha ejecutado el endpoint /");

  return res.status(200).json({
    curso: "Master en Express",
  });
});





//Crear servidores y escuchar http
app.listen(PORT, () => {
  console.log(`Server is listening in the port ${PORT}`);
});
