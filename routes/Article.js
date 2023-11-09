const express = require("express");
const router = express.Router();
const multer = require("multer");
const ArticlesController = require("../controllers/Articles");


const almacenamiento = multer.diskStorage({

  destination:function(req,file,cb){
    cb(null,"./imagenes/articulos/");
  },

  filename: function(req,file,cb){
    cb(null,"articulo" + Date.now() + file.originalname);
  },
})

const subidas = multer({storage: almacenamiento})

//Rutas de prueba
router.get("/articulos", ArticlesController.listar);
router.get("/articulos/:id", ArticlesController.uno);
router.delete("/articulos/:id", ArticlesController.borrar);
router.put("/articulos/:id", ArticlesController.actualizar);
router.post("/crear", ArticlesController.crear);
router.post("/subir-imagen/:id",subidas.single("file0"), ArticlesController.subir);

module.exports = router;