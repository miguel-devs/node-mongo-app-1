const express = require("express");
const router = express.Router();

const {profile,uploadProfile} = require("../controllers/profileController");
const verificarUsuario = require("../middlewares/verificarUsuario");

router.get("/",verificarUsuario,profile);
router.post("/save",verificarUsuario,uploadProfile);

module.exports = router;