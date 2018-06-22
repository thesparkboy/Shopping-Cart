const Sequelize = require('sequelize')
const Cart = require('./db').Cart

let quant = [];
Cart.findAll().then(item => {
  quant = item;
  console.log('----------------------------------------------------')
  // console.log(quant[0].dataValues);
  console.log(quant.length);
});
// console.log(quant);
// insert into carts (name,description,price,quantity,createdAt,updatedAt) VALUES ('test','descript',100,1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
