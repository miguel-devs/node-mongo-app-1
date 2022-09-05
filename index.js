//librerias
const express = require("express");
const { create } = require("express-handlebars");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const csrf  = require('csurf');
const path = require('path');


//configuracion de la BD y llamar al archivo db
require("dotenv").config();
require("./database/db");

//Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//session
app.use(session({
    secret:"cyberwolf",
    resave:false,
    saveUninitialized:false,
    name:"secret-wolf",
    
}));
//flash
app.use(flash());

//inicializacion de pasport para las sessiones
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//configuracion handelbars
const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"],
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

// inicializacion de csrf y middleware verificacion csrf
app.use(csrf());
app.use((req,res,next)=>{
    
    res.locals.user = req.user;
    res.locals.csrfToken = req.csrfToken();
    res.locals.mensaje = req.flash("mensaje");
    res.locals.mensajes = req.flash("mensajes");
    next();
});


//rutas
app.use("/",require("./routes/auth"));
app.use("/home",require("./routes/home"));
app.use("/profile",require("./routes/profile"));
app.use("/book",require("./routes/book"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server andando 🔥"));