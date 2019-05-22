const db = require('../database');
const Boom = require('@hapi/boom');

module.exports = {
  getRoot: function(request, h) {
    console.log(request.query);
    const { name } = request.query;
    if (name) {
      return `Привет, ${name}. Я сервер!`;
    }

    return 'Привет, я сервер. А ты кто?';
  },
  login: async function(request, h) {
    console.log(request.payload);
    const { login, password } = request.payload;

    const existedLogin = await db.users.findOne({ login });
    const existedPassword = await db.users.findOne({ password });

    if (existedLogin && existedPassword) {
      return existedLogin.token;
    }
    return Boom.unauthorized(`User doesn't exist`);
  },
  register: async function(req) {
    console.log(req.payload);
    const { login, password } = req.payload;
    const existedUser = await db.users.findOne({ login });
    if (existedUser) {
      return Boom.badRequest(`Login already exist. Think of another login`);
    }

    await db.users.create({
      login,
      password
    });
    return `Вы успешно зарегистрировались на сайте!`;
  },
  info: async function(req) {
    console.log(req.query);
    const { login } = req.query;
    return await db.users.findOne({login});
  },
  putinfo: async function(req) {
    const { login, password, birthDate, name, surname, userId } = req.payload;
    const dbUserId = req.auth.credentials.userId;
    if (userId === dbUserId) {
      await db.users.updateOne({ userId }, { login, password, birthDate, name, surname });
      return await db.users.findOne({ userId });
    }
    return Boom.forbidden(`Yor are not allowed`);
  },
  delete: async function(req) {
    const { userId } = req.payload;
    const dbUserId = req.auth.credentials.userId;

    if (userId === dbUserId) {
      await db.users.deleteOne({ userId });
      return `Account successfully deleted`;
    } else {
      return Boom.forbidden(`Yor are not allowed`);
    }
  }
};