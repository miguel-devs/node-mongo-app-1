const  { check,validationResult} = require("express-validator");

const bodyUsername = check("userName").trim().escape()
.notEmpty().withMessage("El campo usuario no debe estar vacio").bail()
.isLength({min:5}).withMessage("El campo usuario debe tener al menos 5 caracteres").bail();

const bodyEmail = check("email").trim().escape()
.isEmail().withMessage("Ingrese un email valido").bail();

const bodyPassword = check("password").trim().escape()
.notEmpty().withMessage({id:"password",msg:"El campo password no debe estar vacio"}).bail()
.isLength({min:5}).withMessage("El campo password debe tener al menos 5 caracteres").bail()
.isLength({max:20}).withMessage("El campo password debe tener maximo 20 caracteres").bail()
.matches(/\d/).withMessage('Debe contener, al menos un numero').bail();

const bodyPasswordLogin = check("password").trim().escape()
.notEmpty().withMessage("El campo password no debe estar vacio").bail();

const reglasRegistro  = () => {
    return [
        bodyUsername,
        bodyEmail,
        bodyPassword.custom((value,{req})=> {
             if(value !== req.body.repassword){
                   throw new Error("No coinciden las contraseñas");
             } else{
                return value;
             }
           }),
        ]
}
const validarRegistro = (req,res,next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    req.flash("mensajes",errors.array());
    return res.redirect("/signup");
}

const reglasLogin = () =>{
    return [bodyEmail,bodyPasswordLogin];
}

const validarLogin = (req,res,next) =>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    req.flash("mensajes",errors.array());
    return res.redirect("/");
} 

module.exports = {
    reglasRegistro,
    validarRegistro,
    reglasLogin,
    validarLogin,
}