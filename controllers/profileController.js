const User = require("../models/User");
const formidable = require('formidable');
const path = require('path');
const fs = require("fs");

const profile = async (req,res) => {

    const user = await User.findById(req.user.id).select("userName pictureProfile");
    
    res.render("profile/profile",{nombreUsuario:user.userName,fotoPerfil:user.pictureProfile});
}
const uploadProfile =  async(req,res) => {
  const form = formidable();
    
  form.parse(req, async (err, fields, file) => {
     try {
         
        const fileUpload   = file.imageProfile;
        const validateSize = 20*1024*1024;
        const extension    = fileUpload.mimetype.split("/")[1];
        const newName      = req.user.id+"."+extension;
        const dirFile      = path.join(__dirname,`../public/image/${newName}`);
        console.log(dirFile);
                      
        if(fileUpload.originalFilename === ""){
             throw new Error("Por favor cargue una imagen")
        }
        if(!["image/jpeg","image/png"].includes(fileUpload.mimetype)){
            throw new Error("Por favor cargue un formato valido")
        }
        if(fileUpload.size > validateSize){
            throw new Error("La imagen es demaciado pesada");
        }
           const user = await User.findById(req.user.id);
           user.pictureProfile = newName;
           await user.save();

           fs.renameSync(fileUpload.filepath,dirFile);
           req.flash("mensaje","La imagen se cargo con exito");

     } catch (error) {
         req.flash("mensaje",error.message);
    }finally{
         return res.redirect("/profile");
     }
   
   
  });


}
module.exports = {
    profile,
    uploadProfile
}