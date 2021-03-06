const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/todoEdirect';

module.exports.connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    mongoose.set('useFindAndModify', false);
    mongoose.connection.on('connected', () => {
      console.log('Mongo connected');
      resolve()
    });
    mongoose.connection.on('error', (err) => reject(err))
  })
};

module.exports.close = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection.close(() => resolve());
    mongoose.connection.on('error', (err) => reject(err))
  })
};

