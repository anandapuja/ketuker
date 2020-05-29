/* eslint-disable no-undef */
import 'babel-polyfill';
import { setUpTest } from './helper/helper';
import { graphqlTestCall } from './utils/graphqlTestCall';

const addProduct = `
  mutation addProduct($input: InputProduct!) {
    addProduct(input: $input) {
      id
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

const registerMutation = `
  mutation registerUser($input: UserRegister) {
    register(input:$input) {
      id
      username
      token
    }
  }
`;
let tokenUser, existId;
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
  const { data: { register: { id } } } = res;
  existId = id;
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
    expect(userId).toEqual(existId);
  });

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
    const res = await graphqlTestCall(addProduct, { input });
    const { errors: [ { message } ] } = res;
    expect(message).toEqual('You have to login!');
  });
});