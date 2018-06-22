const router = require('express').Router()

router.use('/', require('./api'))
router.use('/products', require('./product'));
router.use('/admin', require('./admin'));
router.use('/cart', require('./cart'));

exports = module.exports = router;
