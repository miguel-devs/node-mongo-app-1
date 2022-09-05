const Book = require("../models/Book");

const indexBooks = async(req,res) => {

      // console.log(req.user.id);
      try {
        const books =  await Book.find({userId:req.user.id}).lean();
        res.render("books/index",{books:books});
      } catch (error) {
        console.log("Error algo fallo" + error);
      }
} 

const createBooks = async(req,res)=> {
  res.render("books/create");
}

const storeBooks = async(req,res) => {
   const {title,author} = req.body;
   const userId = req.user.id;
   try {
      const book = new Book({title:title,author:author,userId:userId});
      await book.save();
      req.flash("mensaje","Libro guardado");
      res.redirect("/book/create");
   } catch (error) {
       req.flash("mensaje","Hubo un error intentelo nuevamente");
       res.redirect("/book/create");
   }
}

const delateBook = async(req,res) => {
    const {id} = req.params;
    try {
          const book =  await Book.findById(id);
          if(!book)throw new Error("Este libro no se encuentra registrado");
          console.log(book.userId +" "+ req.user.id);
          if(!book.userId.equals(req.user.id))throw new Error("Tu no creaste este libro");
          await book.remove();
          req.flash("mensaje","Libro borrado con exito");
          res.redirect("/book/index");
    } catch (error) {
        req.flash("mensaje",error.message);
        res.redirect("/book/index");
    }
}

const editBook = async(req,res) => {
  const {id} = req.params;
 
  try {
    const book = await Book.findById(id).lean(); 
    if(!book)throw new Error("Este libro no se encuentra registrado");
    if(!book.userId.equals(req.user.id))throw new Error("Tu no creaste este libro");
    res.render("books/edit",{book});
  } catch (error) {
    req.flash("mensaje",error.message);
    res.redirect("/book/index");
  }
}

const updateBook = async(req,res) => {
  const { id } = req.params;
  const request = req.body;

  try {
    const book = await Book.findById(id);
    if(!book)throw new Error("Este libro no se encuentra registrado");
    if(!book.userId.equals(req.user.id))throw new Error("Tu no creaste este libro");
    await book.updateOne(request);
    req.flash("mensaje","Libro actualizado con exito");
    res.redirect("/book/edit/"+book._id);
  } catch (error) {
    req.flash("mensaje",error.message);
  }

}

module.exports = {
    indexBooks,
    createBooks,
    storeBooks,
    delateBook,
    editBook,
    updateBook
}