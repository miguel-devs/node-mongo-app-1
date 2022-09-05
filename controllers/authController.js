const User = require("../models/User");
const nodemailer = require("nodemailer");
require("dotenv").config();

//nodemailer


const signIn = async(req,res) => {
        res.render("auth/SignIn");

}
const signUp = async(req,res) => {
    res.render("auth/SignUp");
}
const resetPassword = async(req,res) => {
    res.render("auth/ResetPassword");
}
const register = async(req,res) =>{
    const {userName,email,password} = req.body;
    try {
        let _userEmail = await User.findOne({email:email});
        let _userName  = await User.findOne({userName:userName});
        //  { $or: [{ name: "Rambo" }, { breed: "Pugg" }, { age: 2 }] }
        //let user = await User.find({ $or: [{ email: email }, { email: email }] });

        if(_userEmail) throw new Error("ya existe este correo");
        if(_userName)  throw new Error("ya existe este usuario");


          let user = new User({userName,email,password});
          await user.save();

          const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.userEmail,
              pass: process.env.passwordEmail
            }
          });

          await transport.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "migueldevs@outlook.com", // list of receivers
            subject: "Verifica tu correo electronico", // Subject line
            html: `<a href="http://localhost:5000/verificarCuenta/${user.tokenConfirm}">verifica tu cuenta</a>`, // html body
          });

      

          req.flash("mensaje","Revisa tu correo electronico");
          res.redirect("/signup");
    
    } catch (error) {
        req.flash("mensaje",error.message);
        return res.redirect("/signup");   
    }
}
const verificarCuenta = async(req,res) => {
   const { token } = req.params;
   try {
      const user = await User.findOne({tokenConfirm:token});
      if(!user)  throw new Error("No existe el token");
      if(user.userConfirm) throw new Error("Esta cuenta ya esta verificada");
       user.userConfirm = true;
       await user.save();
      
       req.flash("mensaje","Cuenta confirmada");
       res.redirect("/");
   } catch (error) {
    req.flash("mensaje",error.message);
    return res.redirect("/");   
   }
}
const login = async(req,res) => {
   const {email, password} = req.body;

     try {
         const user = await User.findOne({email});
         if(!user) throw new Error("El usuario no existe");
         if(!user.userConfirm) throw new Error("No has verificado tu cuenta");
         if(!await user.comparePassword(password)) throw new Error("Contraseña invalida"); 
        
         req.login(user,function(err){
               if (err) throw new Error("Error al crear la sesion");
               return res.redirect("/book/index");
         });


     } catch (error) {

        req.flash("mensajes",[{msg:error.message}]);
        return res.redirect("/");   
     }
   
}
const cerrarSesion = (req,res) => {
    try {
     req.logout(req.user, err => {
     if(err) return next(err);
//        console.log("sesión cerrada con exito");
         res.redirect("/");
     });
    } catch (error) {
            return res.json("Hubo un error, al cerrar la sesión");

    }   
}

module.exports = {
signIn,
signUp,
resetPassword,
register,
verificarCuenta,
login,
cerrarSesion
};