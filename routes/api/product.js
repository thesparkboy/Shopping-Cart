const Product = require('../../db').Product
const router = require('express').Router()

var sessionChecker = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
};

router.get('/', sessionChecker, (req, res) => {
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

router.post('/', sessionChecker, (req, res) => {
    if (isNaN(req.body.price)) {
        return res.status(403).send({
            error: "Price is not a number"
        })
    }
    if(req.body.urls.length == 0){
      console.log("------------------");
      req.body.urls = "https://c.tribune.com.pk/2018/04/1688067-pphotcoffeerfistockx-1523983605-649-640x480.jpg"
    }
    Product.create({
        name: req.body.name,
        description: req.body.description,
        price: parseFloat(req.body.price),
        url: req.body.urls
    }).then((product) => {
        res.redirect('/products');
    }).catch((error) => {
        console.log(req.body.url);
        res.status(501).send({error})
    })
})

exports = module.exports =  router
