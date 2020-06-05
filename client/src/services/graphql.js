import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://18.188.107.12/graphql',
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