var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
Book = require('./models/books');

mongoose.connect('mongodb://localhost/bookStore');
var db = mongoose.connection;

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.send("Hai");
});

app.get('/api/getBooks',function(req,res){
    Book.getBooks(function(error,books){
      if(error){
        throw error;
      }else{
        res.json(books);
      }
    });
});

app.get('/api/getBookbyId/:id',function(req,res){
    Book.getBookById(req.params.id,function(error,book){
      if(error){
        throw error;
      }else{
        res.json(book);
      }
    });
});

app.post('/api/create',function(req,res){
    var newBook = req.body;
    Book.addBook(newBook,function(error,book){
      if(error){
        throw error;
      }else{
        res.json(book);
      }
    });
});

app.delete('/api/removeBook/:id',function(req,res){
    Book.removeBook(req.params.id,function(error,book){
      if(error){
        throw error;
      }else{
        res.json(book);
      }
    });
});


app.put('/api/updateBook/:_id',function(req,res){
    var bookId  = req.params._id;
    var bookDetails = req.body;
    Book.updateBook(bookId,bookDetails,function(error,book){
      if(error){
        throw error;
      }else{
        res.json(book);
      }
    });
});


app.listen(3000);
console.log("Started...");
