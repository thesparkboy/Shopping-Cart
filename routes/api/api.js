const router = require('express').Router(),
      Cart = require('../../db').Cart,
      Product = require('../../db').Product

var sessionChecker = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
};

router.post('/cartadd', sessionChecker, (req, res) => {
  req.body.id = parseInt(req.body.id);
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

    } else {
      Cart.create({
          id: req.body.id,
          name: req.body.name,
          description: req.body.description,
          price: parseFloat(req.body.price),
          quantity: 1,
          url:req.body.url
      }).then((product) => {

      }).catch((error) => {
          res.send({error})
      })
    }
  });
})

router.post('/incr', sessionChecker, (req, res) => {
  req.body.id = parseInt(req.body.id);
  Cart.find({ where: { id: req.body.id } }).then(item => {
      item.quantity = item.quantity + 1;
      item.save().then(() => {
        res.send('updated successfully');
      })
  });
})

router.post('/decr', sessionChecker, (req, res) => {
  req.body.id = parseInt(req.body.id);
  Cart.find({ where: { id: req.body.id } }).then(item => {
      if(item == null || item.quantity <= 1){
        Cart.destroy({ where: { id: req.body.id }})
        res.send('updated successfully');
      } else {
        item.quantity = item.quantity - 1;
        item.save().then(() => {
          res.send('updated successfully');
        })
      }
  });
})

router.get('/placed', sessionChecker, (req, res) => {
  Cart.destroy({ where: {}, truncate: true });
  res.render('placed');
})

exports = module.exports = router;
