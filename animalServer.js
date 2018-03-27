var express=require('express');
var app=express();
//setting for express
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/static'));
app.set('views',__dirname+'/views');
app.set('view engine','ejs');
//setting for mongoose
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codingdojo');
var animalSchema=new mongoose.Schema({
  name:{type:String,required:true},
  legs:{type:Number,required:true}
});
mongoose.model('animals',animalSchema);
var Animal=mongoose.model('animals');

//route and view
app.get('/',function(req,res){
  Animal.find({},function(err,animals){
    if(err){
      console.log(err.errors);
    }else{
      return res.render('showAnimals',{animals:animals});
    }
  });
});
app.get('/animals/new',function(req,res){
  return res.render('newAnimal');
});
app.post('/animals',function(req,res){
  Animal.create(req.body,function(err,animal){
    if(err){
      console.log(err.errors);
    }else{
      return res.redirect('/')
    }
  })
});

app.get('/animals/:id',function(req,res){
  Animal.findById(req.params.id,function(err,animal){
    return res.render('animal',{animal:animal});
  });
});

app.get('/animals/edit/:id',function(req,res){
  Animal.findById(req.params.id,function(err,animal){
    return res.render('editAnimal',{animal:animal});
  });
});

app.post('/animals/update/:id',function(req,res){
  Animal.update({_id:req.params.id},{name:req.body.name,legs:req.body.legs},function(err){
    if(err){
      console.log(err.errors);
    }else{
      return res.redirect('/');
    }
  })
});
app.get('/animals/delete/:id',function(req,res){
  Animal.remove({_id:req.params.id},function(err){
    if(err){
      console.log(err.errors);
    }else{
      return res.redirect('/');
    }
  })
});

app.listen(8000,function(){
  console.log('listening on port 8000');
});
