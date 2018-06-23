const Sequelize = require('sequelize')
const Cart = require('../../db').Cart
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
  Cart.findAll()
    .then((products) => {
        res.render('cart',{products})
    })
    .catch((err) => {
        res.status(500).send({
            error: "Carts could not be fetched."
        })
    })
})

router.post('/', sessionChecker, (req, res) => {
  Cart.find({ where: { id: req.body.id } }).then(item => {
    if(item){
        item.quantity = item.quantity + 1;
        item.save().then(() => {})
        res.redirect('/products');
    } else {
      Cart.create({
          id: req.body.id,
          name: req.body.name,
          description: req.body.description,
          price: parseFloat(req.body.price),
          quantity: 1,
          url:req.body.url
      }).then((product) => {
        res.redirect('/products');
      }).catch((error) => {
          res.status(501).send({error})
      })
    }
  });
})

router.post('/add', sessionChecker, (req, res) => {
  Product.find({ where: { id: req.body.id } }).then(item => {
    req.body.name = item.name
    req.body.description = item.description
    req.body.price = item.price
    req.body.url = item.url
  })
  Cart.find({ where: { id: req.body.id } }).then(item => {
    if(item){
        item.quantity = item.quantity + 1;
        item.save().then(() => {})
        res.redirect('/products');
    } else {
      Cart.create({
          id: req.body.id,
          name: req.body.name,
          description: req.body.description,
          price: parseFloat(req.body.price),
          quantity: 1,
          url:req.body.url
      }).then((product) => {
          res.redirect('/products');
      }).catch((error) => {
          res.status(501).send({error})
      })
    }
  });
})

exports = module.exports =  router
