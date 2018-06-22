const Product = require('../../db').Product
const router = require('express').Router()

router.get('/', (req, res) => {
  Product.findAll()
    .then((products) => {
        res.render('product',{products})
    })
    .catch((err) => {
        res.status(500).send({
            error: "Products could not be fetched."
        })
    })
})

router.post('/', (req, res) => {
    if (isNaN(req.body.price)) {
        return res.status(403).send({
            error: "Price is not a number"
        })
    }
    console.log(req.body.url);
    Product.create({
        name: req.body.name,
        description: req.body.description,
        price: parseFloat(req.body.price),
        url: req.body.url
    }).then((product) => {
        res.redirect('/products');
    }).catch((error) => {
        console.log(req.body.url);
        res.status(501).send({error})
    })
})

exports = module.exports =  router
