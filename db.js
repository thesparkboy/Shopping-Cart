const Sequelize = require('sequelize')

const db = new Sequelize('shop', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
    }
})

const Cart = db.define('cart', {
  id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  name: {
        type: Sequelize.STRING,
        allowNull: false,
  },
  description : Sequelize.STRING,
  price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0.0
  },
  quantity : Sequelize.INTEGER,
  url : {
    type: Sequelize.STRING,
    defaultValue : 'https://cdn.cnn.com/cnnnext/dam/assets/150929101049-black-coffee-stock-exlarge-169.jpg'
  }
})

const Product = db.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: Sequelize.STRING,
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    url : {
      type: Sequelize.STRING
    }
})

const User = db.define('users', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
    }
});

db.sync()
    .then(() => console.log('Database synchronized successfully'))
    .catch((err) => console.error("Error creating database"))

exports = module.exports = {
    Cart, Product, User
}
