var express=require('express');
var app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
//mongoose set up
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codingdojo');
var personSchema=mongoose.Schema({name:String});
mongoose.model('Person',personSchema);
var Person=mongoose.model('Person');


app.get('/',function(req,res){
  Person.find({},function(err,persons){
    if(err){
      res.json({message: "Error", error: err});
    }else{
      res.json({message:'Success',data:persons});
    }
  });
});
app.get('/new/:name',function(req,res){
  Person.create({name:req.params.name},function(err,person){
    if(err){
      res.json({message: "Error", error: err});
    }else{
      res.redirect('/');
    }
  });
});

app.get('/remove/:name',function(req,res){
  Person.remove({name:req.params.name},function(err,person){
    if(err){
      res.json({message: "Error", error: err});
    }else{
      res.redirect('/');
    }
  });
});

app.get('/:name',function(req,res){
  Person.find({name:req.params.name},function(err,person){
    if(err){
      res.json({message: "Error", error: err});
    }else{
      res.json({message:"Success",person:person});
    }
  });
});

app.listen(8000,function(){
  console.log('listen on port 8000');
});
