import jwt from 'jsonwebtoken';
import Product from '../models/Product';
const secret = process.env.JWT_SECRET;

export const authen = async auth => {
  if (!auth) throw new Error('You have to login!');
  const token = auth;

  const user = await jwt.verify(token, secret, (err, decoded) => {
    if (err) throw new Error('Invalid token!');
    return decoded;
  });
  return user;
};

export const author = async ({ userId, prodId }) => {
  if (!userId) throw new Error('You have to login!');
  if (!prodId) throw new Error('Product not found!');
  const product = await Product.findById(prodId);
  if (product.userId != userId) throw new Error('You are not authorized!');
  return true;
};