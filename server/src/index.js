require('dotenv').config();
// import { ApolloServer } from 'apollo-server-express';
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const session = require('express-session');
// import mongoose from 'mongoose';
// import { typeDefs, resolvers } from './schemas/index';
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./schemas/index');
// const resolvers = require('./schemas/index').resolvers;

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res })
  });

  mongoose.connect('mongodb+srv://ketuker:ketuker@cluster0-blbck.mongodb.net/ketuker?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const app = express();

  app.use(
    session({
      secret: 'asdjlfkaasdfkjlads',
      resave: false,
      saveUninitialized: false
    })
  );

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: 'http://localhost:3000'
    }
  }); 

  app.listen({ port: 80 }, () =>
    console.log(`🚀 Server ready at http://localhost:80${server.graphqlPath}`)
  );
};

startServer();