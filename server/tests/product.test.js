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

let tokenUser, existId, prodId;
beforeAll(async () => {
  await setUpTest();
  const user = {
    username: 'almasfikri',
    email: 'almas@fikri.com',
    password: 'jancok123',
    avatar: 'image.jpg',
    address: 'Surabaya, Indonesia',
    phone: '082256479787',
  };
  const input = user;
  const res = await graphqlTestCall(registerMutation, { input } );
  const { data: { register: { username } } } = res;
  const { data: { register: { token } } } = res;
  const { data: { register: { _id } } } = res;
  existId = _id;
  tokenUser = token;
  expect(username).toBe(user.username);
});

describe('Test product mutation', () => {
  it('It should create Product', async () => {
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
    const res = await graphqlTestCall(addProduct, { input }, tokenUser);
    const { data: { addProduct: { userId } } } = res;
    const { data: { addProduct: { _id } } } = res;
    prodId = _id;
    expect(userId).toEqual(existId);
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
    expect(message).toEqual('You have to login!');
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
    expect(result).toEqual('Succesfully updated product!');
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
    expect(message).toEqual('Invalid token!');
  });

  it('It should not delete product, invalidtoken', async () => {
    const res = await graphqlTestCall(deleteProduct, { id: prodId }, 'invalidtoken');
    const { errors: [ { message } ] } = res;
    expect(message).toEqual('Invalid token!');
  });

  it('It should delete product', async () => {
    const res = await graphqlTestCall(deleteProduct, { id: prodId }, tokenUser);
    const { data: { deleteProduct: { result } } } = res;
    expect(result).toEqual('Successfully deleted product!');
  });
});