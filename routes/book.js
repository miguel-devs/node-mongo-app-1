const express = require("express");
const { indexBooks,storeBooks,createBooks,delateBook,editBook,updateBook } = require("../controllers/bookController");
const router = express.Router();

//Middleware
const bookValidate = require("../middlewares/bookValidate");
const verificarUsuario = require("../middlewares/verificarUsuario");

router.get("/index",verificarUsuario,indexBooks);
router.get("/create",verificarUsuario,createBooks);
router.post("/store",verificarUsuario,bookValidate,storeBooks);
router.get("/edit/:id",verificarUsuario,editBook);
router.post("/update/:id",verificarUsuario,bookValidate,updateBook);
router.get("/delate/:id",verificarUsuario,delateBook);


module.exports = router;