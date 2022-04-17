const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash= require("lodash");
const mongoose= require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogDB",{ useNewUrlParser: true ,useUnifiedTopology: true});

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.``";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//let composeds=[];   //composed array

//composeds database which will have js object heading and content

//schema
const composedschema= new mongoose.Schema({
  heading: String,
  bodycontent:String
});
//model
const Composed= mongoose.model("Composed",composedschema);







app.get("/", function(req,res){
  Composed.find({},function(err,composed){
    res.render("home",{startingcontent:homeStartingContent, posts:composed});
  })


});

app.get("/about", function(req,res){
  res.render("about",{aboutcon:aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact",{contactcon:contactContent});
});

app.get("/compose", function(req,res){
  res.render("compose");
});


//composing new article
app.post("/compose",function(req,res){
      // var composed={heading: req.body.composedhead, bodycontent:req.body.composedbody};
      // composeds.push(composed);
      // res.redirect("/");
  //document
  const composed= new Composed({
    heading:req.body.composedhead,
    bodycontent:req.body.composedbody
  });
  composed.save(function(err){

  if (!err){

    res.redirect("/");

  }

});

});


//route param
app.get("/posts/:_id", function(req,res){
  console.log(req.params._id);

  Composed.findOne({_id:req.params._id}, function(err, post){
    res.render("post",{headname:post.heading, bodydata:post.bodycontent});
  });


          // for(let i=0;i<composed.length;i++){
          //   if(lodash.lowerCase(req.params._id) === lodash.lowerCase(composed[i]._id) ){
          //     res.render("post",{headname:composed[i].heading, bodydata:composed[i].bodycontent});
          //       console.log("Match Found !!!!");
          //   }else{
          //     console.log("not found");
          //   }
          //
          // }


});










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
