const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");



const { signIn, signUp, resetPassword,register,verificarCuenta,login,cerrarSesion} = require("../controllers/authController");
const {reglasRegistro,validarRegistro,reglasLogin,validarLogin} = require("../middlewares/authValidate");


passport.serializeUser(function(user, done) {
    process.nextTick(function() {
        done(null, { id: user._id, userName: user.userName });
    });
  });

  passport.deserializeUser(async function(user, done) {
      const userDB = await User.findById(user.id);
      return done(null, { id: userDB._id, userName: userDB.userName });
  });

router.get("/",signIn );
router.get("/signup",signUp);
router.get("/reset-password",resetPassword);
router.post("/register",reglasRegistro(),validarRegistro,register);
router.get("/verificarCuenta/:token",verificarCuenta);

router.post("/login",reglasLogin(),validarLogin,login);

router.get("/logout",cerrarSesion);

module.exports = router;
