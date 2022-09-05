const validarBook = (req,res, next) => {
    const {title, author} = req.body;
    let message = [];
    let validate = true;
   


    try {
         
        if(!title){
            message.push({msg:"el campo titulo esta vacio"});
            validate = false;
        }else if(title.length < 5){
            message.push({msg:"el campo titulo no debe tener menos de diez caracteres"});
            validate = false;
        }
        if(!author){
            message.push({msg:"el campo autor esta vacio"});
            validate = false;
        }else if(author < 5){
            message.push({msg:"el campo autor no debe tener menos de diez caracteres"});
            validate = false;
        }

        if (validate){
            return next();
        }else{
            throw error;
        }
        
    } catch (error) {
  
        req.flash("mensajes",message);
        return res.redirect("/book/create");
    }
  

}

module.exports = validarBook;