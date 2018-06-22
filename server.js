const express = require('express')
const Cart = require('./db').Cart
const Product = require('./db').Product
var app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.use('/', require('./routes/api'))

app.set("view engine", "ejs")

app.get('/',(req,res) => {
  res.redirect('/products');
})

app.post('/cartadd', (req, res) => {
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

app.post('/incr', (req, res) => {
  req.body.id = parseInt(req.body.id);
  Cart.find({ where: { id: req.body.id } }).then(item => {
      item.quantity = item.quantity + 1;
      item.save().then(() => {
        res.send('updated successfully');
      })
  });
})

app.post('/decr', (req, res) => {
  req.body.id = parseInt(req.body.id);
  Cart.find({ where: { id: req.body.id } }).then(item => {
      if(item.quantity == 1){
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

app.get('/placed',(req, res) => {
  Cart.destroy({ where: {}, truncate: true });
  res.render('placed');
})


app.listen(8080, () => console.log('Server started on 8080'))
