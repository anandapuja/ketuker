import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;

export const authen = async auth => {
  if (!auth) throw new Error('You have to login!');
  const token = auth;

  const user = await jwt.verify(token, secret, (err, decoded) => {
    if (err) throw new Error('invalid token!');
    return decoded;
  });
  return user;
};