import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

import { typeDefs, resolvers } from './schemas/index';

mongoose.connect('mongodb://localhost:27017/ketuker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Listening on port: ${url}`);
});