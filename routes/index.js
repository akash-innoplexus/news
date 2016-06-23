var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');


router.param('post', function(req, res, next, id){
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();

  });
});

router.param('comment', function(req, res, next, id){
  var query = comment.findById(id);

  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }

    req.comment = comment;
    return next();

  });
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/posts', function(req, res, next){
  Post.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);

  });
});

//we need to make sure that mongoose is imported and that we have handles to the
// Post and Comment models. Then we use the express get() method to define the URL
 // for the route (/posts) and a function to handle the request. Inside our request handler,
 //  we query the database for all posts. If and error occurred, we pass the error to an error
 //   handling function otherwise we use res.json() to send the retrieved posts back to the client.


router.post('/posts', function(req, res, next){
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});


router.get('/Posts/:post', function(req, res, next){

  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
  // res.json(req.post);
});

router.put('/Posts/:post/upvote', function(req, res, next) {
  req.post.upvote(function(err, post){

    if (err) { return next(err); }

    res.json(post);
  });
});


router.post('/Posts/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if (err) { return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if (err) { return next(err); }

      res.json(comment);

    });
  });
});



router.put('/Posts/:post/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){

    if (err) { return next(err); }

    res.json(comment);
  });
});




module.exports = router;
