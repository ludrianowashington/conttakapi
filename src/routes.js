const express = require('express');

const UserController = require('./controller/userController');
const AuthController = require('./controller/authController');
const TransactionController = require('./controller/transactionController');

const {loggedIn} = require('./middleware/auth');

const routes = express.Router();

routes.post('/', AuthController.login);
routes.post('/register', AuthController.register);

routes.get('/profile/', loggedIn, UserController.show);
routes.post('/profile/:id', loggedIn, UserController.update);


routes.get('/overview', loggedIn, (req, res) => {
  res.json({msg: "Seja bem vindo", id: req.user.id, user: req.user.user });
});


routes.get('/transaction', loggedIn, TransactionController.index);
routes.post('/transaction', loggedIn, TransactionController.create);


routes.get('/notifications', loggedIn, (req, res) => {
  res.json({msg: "Seja bem vindo"});
});

routes.get('/list', loggedIn, UserController.index);

module.exports = routes;