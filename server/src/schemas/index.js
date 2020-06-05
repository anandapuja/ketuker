// import { gql } from 'apollo-server';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// import getTokoPedia from '../utilities/scraping';
// import sendEmail from '../utilities/nodemailer';
// import redis from '../utilities/redis';
// import User from '../models/User';
// import Product from '../models/Product';
// import { authen, author } from '../utilities/authenticagtion';
// import Transaction from '../models/Transaction';

const { gql } = require('apollo-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getTokoPedia = require('../utilities/scraping');
const sendEmail = require('../utilities/nodemailer');
const redis = require('../utilities/redis');
const User = require('../models/User');
const Product = require('../models/Product');
const { authen, author } = require('../utilities/authenticagtion');
const Transaction = require('../models/Transaction');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    avatar: String!
    address: String!
    phone: String!
    city: String
    token: String
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
    city: String!
    phone: String!
  }

  type Product {
    _id: ID!
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
    title: String!
    description: String!
    price: Int!
    whislist: String!
    category: String!
    image: String!
    submit: Boolean!
  }

  type Item {
    title: String!
    price: String!
  }

  type MedianPrices {
    items: [Item],
    average: String
  }

  type Output {
    result: String!
  }

  type Transaction {
    _id: ID!
    userOriginal: String!
    userTarget: String!
    productOriginal: [Product]!
    productTarget: [Product]!
    status: Boolean
  }

  input InputProdTrans {
    _id: ID!
    userId: String!
    title: String!
    description: String!
    price: Int!
    whislist: String!
    category: String!
    image: String!
    submit: Boolean!
  }

  input InputTransaction {
    userTarget: String!
    productOriginal: [InputProdTrans]!
    productTarget: [InputProdTrans]!
  }

  type Query {
    getUsers: [User]!
    getUser(id: ID!): User!

    getProducts: [Product]!
    getProductsFilter(where: String): [Product]!
    getProduct(id: ID!): Product!

    ##### nodemailer
    nodemailer: Output!

    ##### scrapping
    getScrap(item: String!): MedianPrices

    productByUser(userId: ID!): [Product]!
    productByCategory(category: String): [Product]!

    transactionById(id: ID): Transaction
    transactionByOriginal(userId: ID!): [Transaction]
    transactionByTarget(userId: ID!): [Transaction]
  }

  type Mutation {
    register(input: UserRegister): User!
    login(input: UserLogin): User!

    addProduct(input: InputProduct!): Product!
    updateProduct(id: ID!, input: InputProduct!): Output!
    deleteProduct(id: ID!): Output!

    addTransaction(input: InputTransaction!): Transaction
    updateTransaction(id: ID!, input: Boolean!): Transaction
    deleteTransaction(id: ID!): Output
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      const checkUsers = JSON.parse(await redis.get('users'));
      if (checkUsers) {
        return checkUsers;
      } else {
        const getAllUsers = await User.find();
        await redis.set('users', JSON.stringify(getAllUsers));
        return getAllUsers;
      }
    },
    getUser: async (_, { id }) => {
      try {
        console.log('masuk ga');
        const users = JSON.parse(await redis.get('users'));
        let user;
        if(users) {
          user = users.filter((el) => el._id == id);
        } 
        if (user && user.length) {
          const [ data ] = user;
          return data;
        } else {
          const getOneUser = await User.findOne({ _id: id });
          if(users) {
            users.push(getOneUser);
            await redis.set('users', JSON.stringify(users));
          }
          return getOneUser;
        }
      } catch (e) {
        return new Error('User not found!');
      }
    },

    getProducts: async () => {
      const getProducts = JSON.parse(await redis.get('products'));
      if (getProducts) {
        return getProducts;
      } else {
        const getAllProducts = await Product.find();
        await redis.set('products', JSON.stringify(getAllProducts));
        return getAllProducts;
      }
    },
    getProductsFilter: async (_, { where }) => {
      const products = JSON.parse(await redis.get('products'));
      const getProducts = products.filter(el => el.submit == where);
      if (getProducts.length) {
        return getProducts;
      } else {
        const getAllProducts = await Product.find({ submit: where });
        await redis.set('products', JSON.stringify(getAllProducts));
        return getAllProducts;
      }
    },
    getProduct: async (_, { id }) => {
      try {
        const products = JSON.parse(await redis.get('products'));
        if (products) {
          const [ product ] = products.filter((el) => el._id == id);
          if (product) return product;
          else {
            const getOneProduct = await Product.findOne({ _id: id });
            product.push(getOneProduct);
            await redis.set('products', JSON.stringify(products));
            return getOneProduct;
          }
        } else {
          const productsDb = await Product.find();
          const getOneProduct = await Product.findOne({ _id: id });
          await redis.set('products', JSON.stringify(productsDb));
          return getOneProduct;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    productByUser: async (_, { userId }) => {
      try {
        const products = JSON.parse(await redis.get('products'));
        let newProducts;
        if (products) {
          const product = products.filter((el) => el.userId == userId);
          if (product) return product;
        }
        const getProduct = await Product.findOne({ userId: userId });
        if (products) {
          newProducts = [ ...products, getProduct ];
        } else {
          newProducts = await Product.find();
        }
        await redis.set('products', JSON.stringify(newProducts));
        return getProduct;
      } catch (error) {
        console.log(error, '>>>>>>>2');
      }
    },

    productByCategory: async (_, { category }) => {
      try {
        if (category) {
          const products = JSON.parse(await redis.get('products'));
          if (products) {
            const product = await products.filter((el) => el.category == category);
            if (product.length) {
              return product;
            }
          }
          const getProduct = await Product.find({ category: category });
          return getProduct;
        } else {
          const getProducts = JSON.parse(await redis.get('products'));
          if (getProducts) {
            return getProducts;
          } else {
            const getAllProducts = await Product.find();
            await redis.set('products', JSON.stringify(getAllProducts));
            return getAllProducts;
          }
        }
      } catch (error) {
        return error;
      }
    },

    transactionById: async (_, { id }) => {
      try {
        const transaction = await Transaction.findById(id);
        return transaction;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    transactionByOriginal: async (_, { userId }) => {
      try {
        const transactions = await Transaction.find({ userOriginal: userId });
        return transactions;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    transactionByTarget: async (_, { userId }) => {
      try {
        const transactions = await Transaction.find({ userTarget: userId });
        return transactions;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    nodemailer: async () => {
      //nanti diisi sesuai data client nya. dibawah hanya template contoh
      try {
        const mail = 'smpoern4mild@gmail.com';
        const subs = 'Invitation bartering goods';
        const text =
          ' Hai, I would like to barter my goods with your goods. give me reaction if you are interesting or we can talk first before get deal :)';

        await sendEmail(mail, subs, text);

        return {
          result: 'Succesfully sent email to our lovely client!',
        };
      } catch (error) {
        console.log(error);
      }
    },

    getScrap: async (_, { item }) => {
      const scrappedData = await getTokoPedia(item);
      let harga = 0;
      scrappedData.forEach(el => {
        let num = el.price.slice(3);
        let newNum = num.replace(/[^\w\s]/gi, '');
        harga += Number(newNum);
        return harga/scrappedData.length;
      });
      let data = {
        items: scrappedData,
        average: harga/scrappedData.length
      };
      return data;
    },
  },
  Mutation: {
    register: async (_, { input }) => {
      const newUser = new User(input);
      const error = newUser.validateSync();
      if (error) {
        if (error.errors.password) {
          throw new Error(error.errors.password.properties.message);
        } else {
          throw new Error(error.errors.phone.properties.message);
        }
      } else {
        const res = await newUser.save();
        const token = jwt.sign({ id: newUser._id }, 'rahasia');
        const users = JSON.parse(await redis.get('users'));
        if (users) {
          users.push(newUser);
          await redis.set('users', JSON.stringify(users));
        } else {
          await redis.set('users', JSON.stringify([ res ]));
        }
        return { _id: res._id, ...res._doc, token };
      }
    },
    login: async (_, { input }) => {
      const { email, password } = input;
      const getUser = await User.findOne({ email });
      if (getUser) {
        const compare = await bcrypt.compare(password, getUser.password);
        if (!compare) {
          throw new Error('Wrong Password / Wrong Email');
        } else {
          //kalo secretPrivateKey gw taruh di .env masih error. sementara gtu.
          const token = jwt.sign({ id: getUser._id }, 'rahasia');
          const { _id, username, email, avatar, address, phone } = getUser;
          return {
            _id: _id,
            username,
            avatar,
            address,
            phone,
            email,
            password,
            token,
          };
        }
      } else {
        throw new Error('Wrong Password / Wrong Email');
      }
    },

    addProduct: async (
      _,
      { input },
      {
        req: {
          headers: { token },
        },
      }
    ) => {
      const { title, description, price, whislist, category, image, submit } = input;
      const userAuth = await authen(token);
      const user = await User.findOne({ _id: userAuth.id });
      if (!user) throw new Error('You have to login!');
      const newProduct = new Product({
        title,
        description,
        price,
        whislist,
        category,
        image,
        submit,
      });
      newProduct.userId = user._id;
      const savedProduct = await newProduct.save();
      const getProducts = JSON.parse(await redis.get('products'));

      if (getProducts) {
        getProducts.push(savedProduct);
        await redis.set('products', JSON.stringify(getProducts));
      } else {
        const getAllProducts = await Product.find();
        await redis.set('products', JSON.stringify(getAllProducts));
      }
      return newProduct;
    },
    updateProduct: async (
      _,
      { id, input },
      {
        req: {
          headers: { token },
        },
      }
    ) => {
      const { title, description, price, whislist, category, image, submit } = input;

      const userAuth = await authen(token);
      const user = await User.findOne({ _id: userAuth.id });
      if (!user) throw new Error('You have to login!');
      if (!author({ userId: user._id, prodId: id })) throw new Error('You are not authorized!');
      const updateProduct = await Product.findOne({ _id: id });
      updateProduct.title = title;
      updateProduct.description = description;
      updateProduct.price = price;
      updateProduct.whislist = whislist;
      updateProduct.category = category;
      updateProduct.image = image;
      updateProduct.submit = submit;

      await updateProduct.save();
      const products = JSON.parse(await redis.get('products'));
      const newProducts = products.filter((el) => el._id != id);
      if (newProducts.length) {
        newProducts.push(updateProduct);
        await redis.set('products', JSON.stringify(newProducts));
      } else {
        const allProducst = await Product.find();
        await redis.set('products', JSON.stringify(allProducst));
      }
      return {
        result: 'Succesfully updated product!',
      };
    },
    deleteProduct: async (
      _,
      { id },
      {
        req: {
          headers: { token },
        },
      }
    ) => {
      const userAuth = await authen(token);
      const user = await User.findOne({ _id: userAuth.id });
      if (!user) throw new Error('You have to login!');
      if (!author({ userId: user._id, prodId: id }));

      await Product.deleteOne({ _id: id });

      const products = JSON.parse(await redis.get('products'));
      const newProducts = products.filter((el) => el._id != id);
      if (newProducts.length) {
        await redis.set('products', JSON.stringify(newProducts));
      } else {
        const getAllProducts = await Product.find();
        await redis.set('products', JSON.stringify(getAllProducts));
      }
      return {
        result: 'Successfully deleted product!',
      };
    },

    addTransaction: async (
      _,
      { input },
      {
        req: {
          headers: { token },
        },
      }
    ) => {
      try {
        const userAuth = await authen(token);
        const user = await User.findOne({ _id: userAuth.id });
        const { userTarget, productOriginal, productTarget } = input;
        if (productTarget[0].submit) throw new Error('Barang yang kamu inginkan sudah laku');
        // let checkOriginal = productOriginal.filter(el => el.submit === true);
        // if (checkOriginal.length) throw new Error('Barang punya kamu sudah tertukar');
        if (!user) throw new Error('You have to login!');
        const transaction = new Transaction({
          userOriginal: userAuth.id,
          userTarget,
          productOriginal,
          productTarget,
        });
        const newTrans = await transaction.save();
        return newTrans;
      } catch (error) {
        console.log(error, 'Erroororor');
        return error;
      }
    },
    updateTransaction: async ( _, { id, input },
      {
        req: {
          headers: { token },
        },
      }
    ) => {
      try {
        await redis.del('products');
        const userAuth = await authen(token);
        const user = await User.findOne({ _id: userAuth.id });
        if (!user) throw new Error('You have to login!');
        const updateTransaction = await Transaction.findOne({ _id: id });
        updateTransaction.status = input;
        const target = await Product.findById(updateTransaction.productTarget[0]._id);
        if(target.submit) throw new Error('Barang yang kamu inginkan sudah tertukar');
        target.submit = true;
        await target.save();
        let data;
        for (let el of updateTransaction.productOriginal) {
          data = await Product.findOne({ _id: el._id });
          if (data.submit) throw new Error('Barang kamu sudah tertukar');
          data.submit = true;
          await data.save();
        }
        updateTransaction.productTarget[0].submit = input;
        updateTransaction.productOriginal.forEach(el => el.submit = input);
        await updateTransaction.save();
        const newPro = Product.find();
        redis.set('products', JSON.stringify(newPro));
        return updateTransaction;
      } catch (error) {
        console.log(error.message);
        return error;
      }
    },

    deleteTransaction: async ( _, { id }, { req: { headers: { token } } }) => {
      const userAuth = await authen(token);
      const user = await User.findOne({ _id: userAuth.id });
      if (!user) throw new Error('You have to login!');
      await Transaction.findByIdAndRemove(id);
      return {
        result: 'Successfully deleted transaction!',
      };
    }
  },
};

// module.exports = resolvers;
// module.exports = typeDefs;
module.exports = {
  resolvers, typeDefs
};