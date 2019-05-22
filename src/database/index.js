const Mongoose = require('mongoose');
const userSchema = require('./schemas/user');

const port = process.env.MONGODB_PORT;
const host = process.env.MONGODB_HOST;
Mongoose.connect(`mongodb://${host}:${port}/js_course`, { useNewUrlParser: true });
const db = Mongoose.connection;
db.on('error', err => {
  console.log('Connection to mongo failed', err.message);
  throw err;
});

db.once('open', () => {
  console.log('Connection to db succeed');
});

const users = Mongoose.model('user', userSchema);
module.exports = {
  users,
};
