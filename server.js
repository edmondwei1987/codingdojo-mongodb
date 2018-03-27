var express=require('express');
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/static'));
app.set('views',__dirname+'/views');
app.set('view engine','ejs');


//coding with mongoose
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codingdojo');
var QuoteSchema=new mongoose.Schema({
  name:{type:String,required:true},quote:{type:String,required:true}
});
mongoose.model('quotes',QuoteSchema);
var Quote=mongoose.model('quotes');


app.get('/',function(req,res){
  return res.render('index');
});
app.post('/quotes',function(req,res){
  Quote.create(req.body,function(err,quote){
    if(err){
      return res.render('error',{errors:err.errors});
    }else{
      return res.redirect('/showquotes');
    }
  });
});
app.get('/showquotes',function(req,res){
  Quote.find({}).sort('_id').exec(function(err,quotes){
    return res.render('quotes',{quotes:quotes});
  });
});


app.listen(8000,function(){
  console.log('listening on port 8000');
});
