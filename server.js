const express = require('express')
      Cart = require('./db').Cart,
      Product = require('./db').Product,
      bodyParser = require("body-parser"),
      LocalStrategy = require("passport-local")
      app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.use('/', require('./routes/api'))
app.set("view engine", "ejs")

app.get('/',(req,res) => {
  res.render('login');
})

app.listen(8080, () => console.log('Server started on 8080'))
