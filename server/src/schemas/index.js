import { gql } from 'apollo-server';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import redis from '../utilities/redis';
import User from '../models/User';
import Product from '../models/Product';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    avatar: String!
    address: String!
    phone: String!
  }

  input UserLogin {
    email: String!
    password: String!
  }

  input UserRegister {
    username: String!
    email: String!
    password: String!
    avatar: String!
    address: String!
    phone: String!
  }

  type Product {
    id: ID!
    userId: String!
    title: String!
    description: String!
    price: Int!
    whislist: String!
    category: String!
    image: String!
    submit: Boolean!
  }

  input InputProduct {
    userId: String!
    title: String!
    description: String!
    price: Int!
    whislist: String!
    category: String!
    image: String!
    submit: Boolean!
  }

  type Output {
    result: String!
  }

  type Query {
    getUsers: [User]!
    getUser(id: ID!): User!

    getProducts: [Product]!
    getProduct(id: ID!): Product!
  }

  type Mutation {
    register(input: UserRegister): User!
    login(input: UserLogin): User!

    addProduct(input: InputProduct!): Product!
    updateProduct(id: ID!, input: InputProduct!): Output!
    deleteProduct(id: ID!): Output!
  }
`;

export const resolvers = {
  Query: {
    getUsers: async () => {
      // const checkUsers = JSON.parse(await redis.get('users'));

      // if (checkUsers) {
      //   return checkUsers;
      // } else {
      const getAllUsers = await User.find();
      // await redis.set('users', JSON.stringify(getAllUsers));
      // }
      return getAllUsers;
    },
    getUser: async (_, { id }) => {
      const getOneUser = await User.findOne({ _id: id });

      return getOneUser;
    },

    getProducts: async () => {
      // await redis.del('products');
      // const getProducts = JSON.parse(await redis.get('products'));
      // if (getProducts) {
      //   return getProducts;
      // } else {
      const getAllProducts = await Product.find();
      // await redis.set('products', JSON.stringify(getAllProducts));
      // }
      return getAllProducts;
    },
    getProduct: async (_, { id }) => {
      const getOneProduct = await Product.findOne({ _id: id });
      return getOneProduct;
    },
  },
  Mutation: {
    register: async (_, { input }) => {
      const newUser = new User(input);
      const error = newUser.validateSync();
      // console.log(error, '<<<<<<<<<<<<');
      if (error) {
        if (error.errors.password) {
          throw new Error (error.errors.password.properties.message);
        } else {
          throw new Error (error.errors.phone.properties.message);
        }
      } else {
        await newUser.save();
        return newUser;
      }
    },
    login: async (_, { input }) => {
      await redis.flushall();
      const { email, password } = input;
      const getUser = await User.findOne({ email });
      const compare = await bcrypt.compare(password, getUser.password);

      if (!compare) {
        getUser.result = 'Wrong password!';

        return getUser.result;
      } else {
        //kalo secretPrivateKey gw taruh di .env masih error. sementara gtu.
        const token = jwt.sign({ email }, 'rahasia');
        await redis.set('token', token);

        return getUser;
      }
    },

    addProduct: async (_, { input }) => {
      await redis.del('products');

      const { userId, title, description, price, whislist, category, image, submit } = input;
      const newProduct = new Product({
        userId,
        title,
        description,
        price,
        whislist,
        category,
        image,
        submit,
      });
      await newProduct.save();

      const getAllProducts = await Product.find();
      await redis.set('products', JSON.stringify(getAllProducts));

      return newProduct;
    },
    updateProduct: async (_, { id, input }) => {
      await redis.del('products');
      const { title, description, price, whislist, category, image, submit } = input;
      const updateProduct = await Product.findOne({ _id: id });

      updateProduct.title = title;
      updateProduct.description = description;
      updateProduct.price = price;
      updateProduct.whislist = whislist;
      updateProduct.category = category;
      updateProduct.image = image;
      updateProduct.submit = submit;

      await updateProduct.save();
      const getAllProducts = await Product.find();
      await redis.set('products', JSON.stringify(getAllProducts));

      return {
        result: 'Successfully updated product!',
      };
    },
    deleteProduct: async (_, { id }) => {
      await redis.del('products');
      await Product.deleteOne({ _id: id });

      const getAllProducts = await Product.find();
      await redis.set('products', JSON.stringify(getAllProducts));
      return {
        result: 'Successfully deleted product!',
      };
    },
  },
};
