const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    }, 
    author: { 
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
