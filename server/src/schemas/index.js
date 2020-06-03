import { gql } from 'apollo-server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import redis from '../utilities/redis';
import User from '../models/User';
import Product from '../models/Product';
import { authen, author } from '../utilities/authenticagtion';
import Transaction from '../models/Transaction';

export const typeDefs = gql`
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
    items: [Item]
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
    getProduct(id: ID!): Product!

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

export const resolvers = {
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
        const users = JSON.parse(await redis.get('users'));
        const user = users.filter((el) => el._id == id);
        if (user.length) {
          const [data] = user;
          return data;
        } else {
          const getOneUser = await User.findOne({ _id: id });
          users.push(getOneUser);
          await redis.set('users', JSON.stringify(users));
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
    getProduct: async (_, { id }) => {
      try {
        const products = JSON.parse(await redis.get('products'));
        if (products) {
          const [product] = products.filter((el) => el._id == id);
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
          newProducts = [...products, getProduct];
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
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const users = JSON.parse(await redis.get('users'));
        if (users) {
          users.push(newUser);
          await redis.set('users', JSON.stringify(users));
        } else {
          await redis.set('users', JSON.stringify([res]));
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
          const token = jwt.sign({ id: getUser._id }, process.env.JWT_SECRET);
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
        console.log(error);
        return error;
      }
    },
    updateTransaction: async (
      _,
      { id, input },
      {
        req: {
          headers: { token },
        },
      }
    ) => {
      const userAuth = await authen(token);
      const user = await User.findOne({ _id: userAuth.id });
      if (!user) throw new Error('You have to login!');
      const updateTransaction = await Transaction.findOneAndUpdate({ _id: id }, { status: input });
      await updateTransaction.save();

      return updateTransaction;
    },

    deleteTransaction: async (
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
      await Transaction.findByIdAndRemove(id);
      return {
        result: 'Successfully deleted transaction!',
      };
    },
  },
};
