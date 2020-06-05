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
mutation addProduct($input: InputProduct) {
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

export const GET_ALL_PRODUCT_Filter = gql`
query getProductsFilter($where: String){
  getProductsFilter(where: $where) {
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

export const GET_PRODUCT_DETAIL = gql`
query productDetail($id: ID) {
  getProduct(id: $id) {
    _id
    title
    description
    userId
    category
    image
    submit
    price
    whislist
  }
}
`;

export const GET_PRODUCT_USER = gql`
query productByUser($userId: ID) {
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

export const GET_PRODUCT_USER_AND_DETAIL = gql`
query ($id: ID, $userId: ID) {
  productByUser(userId: $userId) {
    _id
    title
    description
    userId
    category
    image
    submit
    price
    whislist
  }
  getProduct(id: $id) {
    _id
    title
    description
    userId
    category
    image
    submit
    price
    whislist
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

export const GET_PRODUCTS_AND_USERS = gql`
  query($category: String) {
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
    getUsers {
      username,
      city
    }
  }
`;

export const GET_USER = gql`
query getUser($id: ID) {
  getUser(id: $id) {
    username,
    address,
    avatar
    city
    phone
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

export const TRANSACTION = gql`
mutation addTransaction($input: InputTransaction) {
  addTransaction(input: $input) {
    _id
    userTarget
    userOriginal
    status
  }
}
`;

export const GET_TRANSACTION_BYID = gql`
query ($id: ID, $userId1: ID, $userId2: ID) {
  transactionById(id: $id) {
    _id
    userTarget
    userOriginal
    status
    productOriginal {
      title
      price
      description
      image
    }
    productTarget {
      title
      price
      description
      image
    }
  }
  userOriginal: getUser(id: $userId1) {
    username,
    address,
    avatar
    city
  }
  userTarget: getUser(id: $userId2) {
    username,
    address,
    avatar
    city
  }
}
`;

export const GET_TRANSACTION_USER = gql`
query ($userId: ID) {
  transactionByOriginal(userId: $userId) {
    _id
    userTarget
    userOriginal
    status
    productOriginal {
      title
      price
      description
    }
    productTarget {
      title
      price
      description
    }
  },
  transactionByTarget(userId: $userId) {
    _id
    userTarget
    userOriginal
    status
    productTarget {
      title
      price
      description
      image
    }
  },
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

export const updateTransaction = gql`
mutation ($id: ID, $input: Boolean) {
  updateTransaction(id: $id, input: $input) {
    _id
    userTarget
    userOriginal
    status
    productOriginal {
      title
      price
      description
    }
    productTarget {
      title
      price
      description
    }
  }
}
`;

export const deleteTransaction = gql`
mutation ($id: ID) {
  deleteTransaction(id: $id) {
    result
  }
}
`;

export const updateProduct = gql`
mutation ($id: ID, $input: InputProduct) {
  updateProduct(id: $id, input: $input) {
    result
  }
}
`;

export const deleteProduct = gql`
mutation ($id: ID) {
  deleteProduct(id: $id) {
    result
  }
}
`;

export const scrapPrice = gql`
query ($item: String) {
  getScrap (item: $item) {
    items {
      title
      price
    }
    average
  }
}
`;
