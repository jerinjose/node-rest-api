var mongoose = require('mongoose');

var booksSchema = mongoose.Schema({
    title:{
      type:String,
      required:true
    },
    description : {
      type:String,
      required:true
    },
    by:{
      type:String
    },
    url:{
      type:String
    }
});

var book = module.exports = mongoose.model('books',booksSchema);

module.exports.getBooks = function(callback,limit){
  book.find(callback).limit(limit);
}

module.exports.getBookById = function(id,callback,limit){
  book.findById(id,callback);
}

module.exports.addBook = function(newbook,callback,limit){
  book.create(newbook,callback);
}

module.exports.updateBook = function(id,bookDetails,options,callback,limit){
  var query = {_id:id};
  var update = {
    title : bookDetails.title
  };
  book.findOneAndUpdate(query,update,options,callback);
}

module.exports.removeBook = function(id,callback,limit){
  book.remove({_id:id},callback);
}
