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
        res.render('admin');
})

exports = module.exports =  router
