// import Redis from 'ioredis';
const Redis = require('ioredis');

const redis = new Redis();

// export default redis;
module.exports = redis;