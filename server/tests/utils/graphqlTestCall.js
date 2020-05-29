import { makeExecutableSchema } from 'apollo-server';
import { typeDefs, resolvers } from '../../src/schemas';
import { graphql } from 'graphql';

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const graphqlTestCall = async (query, variables=null, id=null) => {
  return graphql(
    schema,
    query,
    undefined, 
    
    { id },
    // {
    //   req: {
    //     session: {
    //       id
    //     }
    //   },
    //   res: {
    //     clearCookie: () => {}
    //   }
    // },
    variables
  );
};