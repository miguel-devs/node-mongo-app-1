const express = require("express");
const router = express.Router();

const {indexHome} = require("../controllers/homeController");
const verificarUsuario = require("../middlewares/verificarUsuario");

router.get("/",verificarUsuario,indexHome);

module.exports = router;