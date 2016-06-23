var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: string,
  link: string,
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});


mongoose.model('post', PostSchema);
