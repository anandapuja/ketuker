import mongoose from 'mongoose';

// const { ObjectId } = mongoose.Types;

const config = {
  db: {
    test: 'mongodb://localhost:27017/ketuker_test'
  },
  connection: null
};

function connect () {
  return new Promise((resolve, reject) => {
    if (config.connection) {
      return resolve();
    }

    const mongoUri = 'mongodb://localhost:27017/ketuker_test';

    mongoose.Promise = Promise;

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };

    mongoose.connect(mongoUri, options);

    config.connection = mongoose.connection;

    config.connection
      .once('open', resolve)
      .on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
          console.log(e);

          mongoose.connect(mongoUri, options);
        }

        console.log(e);
        reject(e);
      });
  });
}

function clearDatabase () {
  return new Promise(resolve => {
    let cont = 0;
    let max = Object.keys(mongoose.connection.collections).length;
    for (const i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteMany(function () {
        cont++;
        if(cont >= max) {
          resolve();
        }
      });
    }
  });
}

export async function setUpTest () {
  await connect();
  await clearDatabase();
}