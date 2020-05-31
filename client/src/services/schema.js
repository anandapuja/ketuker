import gql from 'graphql-tag';

export const CREATE_ACCOUNT = gql`
  mutation registerUser($input: UserRegister) {
    register(input:$input) {
      token
      username
      _id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($input: UserLogin) {
    login(input: $input) {
      token
      username
      _id
    }
  }
`;

export const ADD_PRODUCT = gql`
mutation addProduct($input: InputProduct!) {
  addProduct(input: $input) {
    title
    description
    price
    whislist
    category
    image
    submit
    userId
  }
}
`;

export const GET_ALL_PRODUCT = gql`
query getProducts{
  getProducts{
    _id
    title
    description
    userId
    category
    image
    submit
    price
  }
}
`;

export const GET_PRODUCT_USER = gql`
query productByUser($userId: ID!) {
  productByUser(userId: $userId) {
    _id
    title
    description
    userId
    category
    image
    submit
    price
  }
}
`;

export const GET_PRODUCT_CATEGORY = gql`
query productByCategory($category: String) {
    productByCategory(category: $category) {
      _id
      title
      description
      userId
      category
      image
      submit
      price
    }
  }
`;

export const GET_USER = gql`
query getUser($id: ID!) {
  getUser(id: $id) {
    username,
    address,
    avatar
    city
  }
}
`;

export const GET_USERS = gql`
query getUsers{
  getUsers{
    username,
    address,
    avatar
    city
  }
}
`;