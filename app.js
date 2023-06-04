const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');   
const https = require('https');
const ejs = require('ejs');
const multer = require('multer');
const relationSchema = require('./schema');
const fs = require("fs");

const port = 5000;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/relationDB");

const Storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.jpg')
      }
});

const upload = multer({
    storage:Storage
})

app.get('/',(req,res)=>{
    res.render('home');
});
app.get('/about',(req,res)=>{
    res.render('about');
});
app.get('/contact',(req,res)=>{
    res.render('contact');
});
app.get('/compose',(req,res)=>{
    res.render('compose');
});
app.get('/request',(req,res)=>{
    res.render('request');
});
app.get('/update',(req,res)=>{
    res.render('update');
});
app.get('/delete',(req,res)=>{
    res.render('delete');
});
app.get('/success',(req, res)=> {
    res.render('success');
  });
app.get('/dsuccess',(req, res)=> {
    res.render('dsuccess');
  });
app.get('/error',(req, res)=> {
    res.render('error');
  });

  

  app.route('/relation')
  .get(function(req, res) {
    Relation.find(function(err, foundrelation) {
      if (!err) {
        res.send(foundrelation);
      } else {
        res.send(err);
      }
    });
  })
  .post(upload.single('Pimg'), function(req, res) {
    const newrelation = new Relation({
      Pid: req.body.Pid,
      Pfname: req.body.Pfname,
      Plname: req.body.Plname,
      Pimg: {
        data: req.file ? req.file.filename : null,
        contentType: 'image/jpg'
      },
      Pdesc: req.body.Pdesc,
      Pdob: req.body.Pdob,
      Pfather: req.body.Pfather,
      Pmother: req.body.Pmother
    });

    newrelation.save(function(err) {
      if (!err) {
        res.render('success');
      } else {
        res.send(err);
      }
    });
  });

app.route("/relation/:relationID")
// app.route("/relation/:relationID")


.get(function(req,res){
    Relation.findOne({Pid: req.params.relationID}, function(err,foundcreature){
        if(foundcreature){
            res.send(foundcreature);
        }
        else{
            res.send("Sorry No creature found");
        }
    });
})
.patch(function(req,res){
    Relation.updateOne(
        { Pid: req.params.relationID},
        { $set: req.body},
        function(err){
        if(!err){
            res.send("Succesfully Updated the creature");
            console.log(" No error happened");

        }
        else{
            res.send(err);
            console.log("error happened");

        }
     });
})

.delete(function(req,res){
    Relation.deleteOne(
        { Pid: req.params.relationID},
        function(err){
        if(!err){
            res.send("succesfully deleted");
            console.log("Success");
        }
        else{
            res.send(err);
            console.log("err....");
        }
    });
});


app.listen(`${port}`, function(){
console.log('server runnimg on port 5000')
});