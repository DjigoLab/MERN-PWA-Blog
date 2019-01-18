const express = require('express');
const router = express.Router();
const Article = require('../models/Article')

router.get('/', async (req, res) => {
    const articles = await Article.find();
    res.send({
        articles
    })
})

router.post('/', async (req, res) => {
    const newArticle = new Article(req.body);
    await newArticle.save().then(console.log(newArticle))
    res.json('New article added')
})

module.exports = router;