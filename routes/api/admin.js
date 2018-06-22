const Product = require('../../db').Product
const router = require('express').Router()

router.get('/', (req, res) => {
        res.render('admin');
})

// router.post('/', (req, res) => {
//     Product.create({
//         name: req.body.name
//     }).then((user) => {
//         res.status(201).send(user)
//     }).catch((err) => {
//         res.status(501).send({
//             error: "Couldn't add new user"
//         })
//     })
// })

exports = module.exports =  router
