const express = require('express')
      bodyParser = require("body-parser"),
      LocalStrategy = require("passport-local")
      app = express()
      session = require('express-session')
      Cart = require('./db').Cart,
      Product = require('./db').Product,
      User = require('./db').User

app.use(session({
    key: 'user_sid',
    secret: 'Such Code! Much Wow!',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

var sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/products');
    } else {
      next();
    }
};

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.use('/', require('./routes/api'))
app.set("view engine", "ejs")

app.get('/', sessionChecker, (req,res) => {
  res.redirect('/login');
})

app.route('/signup')
    .get(sessionChecker, (req, res) => {
        res.render('signup');
    })
    .post((req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            req.session.user = user.dataValues;
            res.redirect('/products');
        })
        .catch(error => {
            res.redirect('/signup');
        });
    });

app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.render('login');
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;
        User.findOne({ where: { username: username, password: password } }).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/products');
            }
        });
    });

app.get('/logout', (req, res) => {
    if (req.session.user) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});


app.listen(8080, () => console.log('Server started on 8080'))
