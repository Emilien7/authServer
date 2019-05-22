const controllers = require('../controllers');
module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: controllers.getRoot,
    options: {
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: controllers.login,
    options: {
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/register',
    handler: controllers.register,
    options: {
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/info',
    handler: controllers.info
  },
  {
    method: 'PUT',
    path: '/info',
    handler: controllers.putinfo
  },
  {
    method: 'POST',
    path: '/delete',
    handler: controllers.delete
  }
];