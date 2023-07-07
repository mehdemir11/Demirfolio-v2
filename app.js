//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "Welcome to my portfolio! I am thrilled to share my journey and showcase my work with you. As a full-stack web developer, I am deeply passionate about JavaScript. Through this platform, I aim to inspire and inform others by sharing my experiences, insights, and creative endeavors. Whether you're here to explore my blog posts or browse through my portfolio, I hope you find inspiration and enjoy your time on my website.";
const aboutContent =
  "Welcome to my portfolio! I'm passionate about software development, and this website serves as a platform for me to share my thoughts, experiences, and creations with you. I have always been fascinated by software universe. Through this platform, I aim to inspire and connect with like-minded individuals, fostering a community where we can learn and grow together. Join me on this exciting journey as we explore full-stack development. Thank you for visiting!";
const contactContent =
  "Thank you for visiting my portfolio website! I would be delighted to hear from you. Whether you have a question, a collaboration opportunity, or simply want to say hello, please don't hesitate to reach out. I'm always excited to connect with fellow creatives, potential clients, or anyone interested in my work. You can use the contact form below to send me a message directly, and I'll make sure to respond as soon as possible. Your feedback and inquiries are invaluable to me, and I look forward to the opportunity to engage in meaningful conversations about design, art, and everything in between. Let's create something amazing together!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
