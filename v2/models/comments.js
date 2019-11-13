  "use strict"
const mongoose = require("mongoose")
const Schema = mongoose.Schema
  
const commentSchema = new Schema({
    name: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}]
  });
  module.export = mongoose.model('comment', commentSchema);