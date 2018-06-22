const Product = require('../../db').Product
const router = require('express').Router()

router.get('/', (req, res) => {
        res.render('admin');
})

exports = module.exports =  router
