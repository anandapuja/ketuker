/* eslint-disable no-undef */
import 'babel-polyfill';
import { setUpTest } from './helper/helper';
import { graphqlTestCall } from './utils/graphqlTestCall';

const addProduct = `
  mutation addProduct($input: InputProduct!) {
    addProduct(input: $input) {
      _id
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

const updateProduct = `
  mutation updateProduct($id: ID!, $input: InputProduct!) {
    updateProduct(id: $id, input: $input) {
      result
    }
  }
`;

const deleteProduct = `
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      result
    }
  }
`;

const registerMutation = `
  mutation registerUser($input: UserRegister) {
    register(input:$input) {
      _id
      username
      token
    }
  }
`;

const getProducts = `
  query {
    getProducts {
      title
    }
  }
`;

const getProduct = `
  query ($id: ID!) {
    getProduct(id: $id) {
      title
    }
  }
`;

const productByUser = `
  query ($userId: ID!) {
    productByUser(userId: $userId) {
      title
    }
  }
`;

const productByCategory = `
  query ($category: String) {
    productByCategory (category: $category) {
      title
    }
  }
`;

export const addTransaction = `
  mutation ($input: InputTransaction!) {
    addTransaction (input: $input) {
      userTarget
      _id
    }
  }
`;

export const updateTransaction = `
  mutation ($id: ID!, $input: Boolean!) {
    updateTransaction (id: $id, input: $input) {
      userTarget
    }
  }
`;

export const deleteTransaction =`
  mutation ($id: ID!) {
    deleteTransaction (id: $id) {
      result
    }
  }
`;

export const transactionById = `
  query ($id: ID!) {
    transactionById(id: $id) {
      userTarget
    }
  }
`;

export const transactionByOriginal = `
  query ($userId: ID!) {
    transactionByOriginal(userId: $userId) {
      userTarget
    }
  }
`;

export const transactionByTarget = `
  query ($userId: ID!) {
    transactionByTarget(userId: $userId) {
      userTarget
    }
  }
`;

let tokenUser, existId, prodId, newProd, transId;
beforeAll(async () => {
  await setUpTest();
  const user = {
    username: 'almasfikri',
    email: 'almas@fikri.com',
    password: 'jancok123',
    avatar: 'image.jpg',
    address: 'Surabaya, Indonesia',
    phone: '082256479787',
    city: 'Jakarta'
  };
  const input = user;
  const res = await graphqlTestCall(registerMutation, { input } );
  const { data: { register: { username } } } = res;
  const { data: { register: { token } } } = res;
  const { data: { register: { _id } } } = res;
  existId = _id;
  tokenUser = token;
  expect(username).not.toBeNull();
});

describe('Test product mutation', () => {
  it('It should create Product', async () => {
    const product = {
      title: 'BARANG SATU', 
      description: 'DESC',
      price: 2424242,
      whislist: 'Barang dua',
      category: 'Kategori',
      image: 'image',
      submit: false
    };

    const input = product;
    const res = await graphqlTestCall(addProduct, { input }, tokenUser);
    const { data: { addProduct: { userId } } } = res;
    const { data: { addProduct: { _id } } } = res;
    prodId = _id;
    newProd = res.data.addProduct;
    expect(userId).not.toBeNull();
  });

  it('It should not create Product, No Token', async () => {
    const product = {
      title: 'BARANG SATU', 
      description: 'DESC',
      price: 2424242,
      whislist: 'Barang dua',
      category: 'Kategori 1',
      image: 'image',
      submit: false
    };

    const input = product;
    const res = await graphqlTestCall(addProduct, { input });
    const { errors: [ { message } ] } = res;
    expect(message).not.toBeNull();
  });

  it('It should update products', async () => {
    const product = {
      title: 'BARANG SATU update', 
      description: 'DESC update',
      price: 2424242,
      whislist: 'Barang dua update',
      category: 'Kategori 1',
      image: 'image',
      submit: false
    };

    const input = product;
    const res = await graphqlTestCall(updateProduct, { input, id: prodId }, tokenUser);
    const { data: { updateProduct: { result } } } = res;
    expect(result).not.toBeNull();
  });

  it('It should not update products, invalidtoken', async () => {
    const product = {
      title: 'BARANG SATU update', 
      description: 'DESC update',
      price: 2424242,
      whislist: 'Barang dua update',
      category: 'Kategori 1',
      image: 'image',
      submit: false
    };

    const input = product;
    const res = await graphqlTestCall(updateProduct, { input, id: prodId }, 'invalidtoken');
    const { errors: [ { message } ] } = res;
    expect(message).not.toBeNull();
  });

  it('It should get products', async () => {
    const res = await graphqlTestCall(getProducts, {});
    const { data: { getProducts: { title } } } = res;
    expect(title).not.toBeNull();
  });

  it('It should get product', async () => {
    const res = await graphqlTestCall(getProduct, { id: prodId });
    const { data: { getProduct: { title } } } = res;
    expect(title).not.toBeNull();
  });

  it('It should get product byUser', async () => {
    const res = await graphqlTestCall(productByUser, { userId: existId });
    const { data: { productByUser: { title } } } = res;
    expect(title).not.toBeNull();
  });

  it('It should get product byCategory', async () => {
    const res = await graphqlTestCall(productByCategory, { category: 'Kategori' });
    const { data: { productByCategory: { title } } } = res;
    expect(title).not.toBeNull();
  });

  it('It should not delete product, invalidtoken', async () => {
    const res = await graphqlTestCall(deleteProduct, { id: prodId }, 'invalidtoken');
    const { errors: [ { message } ] } = res;
    expect(message).not.toBeNull();
  });

  describe('Test transaction', () => {
    it('It should create transaction', async () => {
      const data = {
        userTarget: existId,
        productTarget: [ newProd ],
        productOriginal: [ newProd ]
      };
      const input = data;
      const res = await graphqlTestCall(addTransaction, { input }, tokenUser);
      const { data: { addTransaction: { userTarget } } } = res;
      const { data: { addTransaction: { _id } } } = res;
      transId = _id;
      expect(userTarget).not.toBeNull();
    });

    it('It should update transaction', async () => {
      const res = await graphqlTestCall(updateTransaction, { id: transId, input: true }, tokenUser);
      const { data: { updateTransaction: { result } } } = res;
      expect(result).not.toBeNull();
    });

    it('It should get transaction', async () => {
      const res = await graphqlTestCall(transactionById, { id: transId });
      const { data: { transactionById: { userTarget } } } = res;
      expect(userTarget).not.toBeNull();
    });

    it('It should get transaction', async () => {
      const res = await graphqlTestCall(transactionByOriginal, { userId: existId });
      const { data: { transactionByOriginal: { userTarget } } } = res;
      expect(userTarget).not.toBeNull();
    });

    it('It should get transaction', async () => {
      const res = await graphqlTestCall(transactionByTarget, { userId: existId });
      const { data: { transactionByTarget: { userTarget } } } = res;
      expect(userTarget).not.toBeNull();
    });


    
    it('It should delete transaction', async () => {
      const res = await graphqlTestCall(deleteTransaction, { id: transId }, tokenUser);
      const { data: { deleteTransaction: { result } } } = res;
      expect(result).not.toBeNull();
    });
  });
  
  

  it('It should delete product', async () => {
    const res = await graphqlTestCall(deleteProduct, { id: prodId }, tokenUser);
    const { data: { deleteProduct: { result } } } = res;
    expect(result).not.toBeNull();
  });
});