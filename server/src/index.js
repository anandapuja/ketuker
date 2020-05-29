require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
const express = require('express');
const session = require('express-session');
import mongoose from 'mongoose';
import { typeDefs, resolvers } from './schemas/index';

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res })
  });

  mongoose.connect('mongodb://localhost:27017/ketuker', {
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

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();