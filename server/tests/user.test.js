/* eslint-disable no-undef */
import 'babel-polyfill';
import { setUpTest } from './helper/helper';
import { graphqlTestCall } from './utils/graphqlTestCall';

const registerMutation = `
  mutation registerUser($input: UserRegister) {
    register(input:$input) {
      username
    }
  }
`;

beforeAll(async () => await setUpTest());

describe('Test User', () => {
  it('It should not create user, password too short', async () => {
    const user = {
      username: 'almasfikri',
      email: 'almas@fikri.com',
      password: 'jan',
      avatar: 'image.jpg',
      address: 'Surabaya, Indonesia',
      phone: '082256479787',
    };
    const input = user;
    const res = await graphqlTestCall(registerMutation, { input } );
    const { errors: [ { message } ] } = res;
    expect(message).toEqual('too few charachters');
  });

  it('It should create User', async () => {
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
    expect(username).toBe(user.username);
  });

  it('It should not create User, duplicate key', async () => {
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
    const { errors: [ { message } ] } = res;
    expect(message).toEqual('E11000 duplicate key error collection: ketuker_test.users index: email_1 dup key: { email: "almas@fikri.com" }');
  });
});
