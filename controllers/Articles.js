const validator = require("validator");
const Article = require("../models/Articles");
const validarArticulo = require("../helpers/validar");
const fs = require("fs");
const { error } = require("console");

const crear = async (req, res) => {
  //Recoger parametros por guardar
  const parametros = req.body;

  try {
    validarArticulo(parametros);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan o sobran datos",
    });
  }
  try {
    //Crear objeto con modelo
    const article = new Article(parametros);
    //Guardar articulo en base de datos
    const articuloGuardado = await article.save();

    if (!articuloGuardado) {
      return res.status(400).json({
        status: "error",
        mensaje: "No se ha guardado el Articulo",
      });
    }
    //Devolver resultado
    return res.status(200).json({
      status: "success",
      article: articuloGuardado,
      mensaje: "Articulo creado con exito!!",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      mensaje: "Error al guardar el Articulo",
    });
  }
};

const listar = async (req, res) => {
  try {
    const consulta = await Article.find({}).sort({ fecha: -1 }).exec();

    if (!consulta || consulta.isLength === 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No hay articulos",
      });
    }
    return res.status(200).json({
      status: "succes",
      consulta,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "A ocurrido un error",
    });
  }
};

const uno = async (req, res) => {
  try {
    let id = req.params.id;

    const consulta = await Article.findById(id).exec();

    if (!consulta || consulta.isLength === 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No hay articulos",
      });
    }
    return res.status(200).json({
      status: "succes",
      consulta,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "A ocurrido un error 1",
    });
  }
};

const borrar = async (req, res) => {
  try {
    let id = req.params.id;

    const consulta = await Article.findOneAndDelete({ _id: id }).exec();

    if (!consulta || consulta.isLength === 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No hay articulos",
      });
    }
    return res.status(200).json({
      status: "succes",
      mensaje: "objeto borrado",
      articulo_borrado: consulta,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "A ocurrido un error 2",
    });
  }
};

const actualizar = async (req, res) => {
  const parametros = req.body;

  try {
    validarArticulo(parametros);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan o sobran datos1",
    });
  }
  try {
    const id = req.params.id;
    console.log(id);
    let actualizado = await Article.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!actualizado) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se encontró el artículo a actualizar",
      });
    }
    res.status(200).json({
      status: "succes",
      mensaje: "Articulo actualizado",
      articulo: actualizado,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error al actualizar",
    });
  }
};

const subir = async (req, res) => {
  const archivo = req.file.originalname;

  const archivo_split = archivo.split(".");
  const extension = archivo_split[1];

  if (
    extension != "png" &&
    extension != "jpg" &&
    extension != "jpeg" &&
    extension != "gif"
  ) {
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: error,
        mensaje: "Imagen invalida",
      });
    });
  } else {
    res.status(200).json({
      status: "succes",
      mensaje: "Articulo subido",
      files: req.files,
    });
  }
};

module.exports = {
  crear,
  listar,
  uno,
  borrar,
  actualizar,
  subir,
};
