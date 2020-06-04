// import jwt from 'jsonwebtoken';
// import Product from '../models/Product';

const jwt = require('jsonwebtoken');
const Product = require('../models/Product');

const authen = async auth => {
  if (!auth) throw new Error('You have to login!');
  const token = auth;

  const user = await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) throw new Error('Invalid token!');
    return decoded;
  });
  return user;
};

const author = async ({ userId, prodId }) => {
  if (!userId) throw new Error('You have to login!');
  if (!prodId) throw new Error('Product not found!');
  const product = await Product.findById(prodId);
  if (product.userId != userId) throw new Error('You are not authorized!');
  return true;
};

module.exports = authen;
module.exports = author;