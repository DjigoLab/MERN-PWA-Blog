const mongoose = require('mongoose')
const {
    Schema
} = mongoose

const Article = new Schema({
    title: String,
    imageURL: String,
    author: String,
    //date: Date,
    content: String,
})

module.exports = mongoose.model('Article', Article);