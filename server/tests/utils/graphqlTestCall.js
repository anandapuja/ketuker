import { makeExecutableSchema } from 'apollo-server';
import { typeDefs, resolvers } from '../../src/schemas';
import { graphql } from 'graphql';

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const graphqlTestCall = async (query, variables=null, userId=null) => {
  return graphql(
    schema,
    query,
    undefined, {
      req: {
        session: {
          userId
        }
      },
      res: {
        clearCookie: () => {}
      }
    },
    variables
  );
};