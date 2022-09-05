const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const  bcrypt  = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        unique:true
    }, 
    email: { 
        type:String,
        required:true,
        lowercase: true,
        unique:true,
        index:true,
        sparse:true

    },
    password:{
        type:String,
        required:true,
    },
    tokenConfirm:{
       type:String,
       default: () => nanoid()
    },
    userConfirm:{
        type:Boolean,
        default:false
    },
    active:{
        type:Boolean,
        default:true,
    },
    pictureProfile:{
        type:String,
        default:null
    }

});

userSchema.pre('save',async function(next){
    const user = this;
    if(!user.isModified('password'))return next(); 
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(user.password,salt);
        user.password = hash;
        next();
    } catch (error) {
        throw new Error("Error al codificar la contraseña")
    }
});

userSchema.methods.comparePassword = async function(canditePassword){
  return await bcrypt.compare(canditePassword,this.password);
};

module.exports = mongoose.model('User',userSchema);
