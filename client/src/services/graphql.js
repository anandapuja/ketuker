import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  request: (operation) => {
    const userToken = localStorage.getItem('token');
    operation.setContext({
      headers: {
        token: userToken ? userToken : ''
      }
    }); 
  }
});

export default client;