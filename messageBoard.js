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
var Schema=mongoose.Schema;
var messageSchema=new mongoose.Schema({
  name:{type:String,required:true,min:4},
  message:{type:String,required:true},
  comments:[{type:Schema.Types.ObjectId,ref:'Comment'}]
});

var commentSchema=new mongoose.Schema({
  user_name:{type:String,required:true,minlength:4},
  comment:{type:String,required:true},
  _message:{type:Schema.Types.ObjectId,ref:'Message'}
});

mongoose.model('Message',messageSchema);
mongoose.model('Comment',commentSchema);
var Message=mongoose.model('Message');
var Comment=mongoose.model('Comment');
//route and views
app.get('/',function(req,res){
  Message.find({}).populate('comments').exec(function(err,messages){
    // console.log(posts[0].comments[0].name);
    return res.render('messageBoard',{messages:messages});
  });
});
app.post('/addMessage',function(req,res){
  Message.create(req.body,function(err,message){
    return res.redirect('/');
  });
});

app.post('/addComment/:id',function(req,res){
  console.log(req.body);
  Message.findOne({_id:req.params.id},function(err,message){
         var comment = new Comment(req.body);
         comment._message = message._id;
         message.comments.push(comment);
         comment.save(function(err){
                 message.save(function(err){
                       if(err) { console.log('Error'); }
                       else { res.redirect('/'); }
                 });
         });
      // Comment.create(req.body,function(errors,comment){
      // comment._message=message._id;
      // message.comments.push(comment);
      // message.save(function(error){
      //   res.redirect('/');
      // });
      // });
  });
});

app.listen(8000,function(){
  console.log('listening on port 8000');
});
