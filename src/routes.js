const express = require('express');

const UserController = require('./controller/userController');
const AuthController = require('./controller/authController');
const TransactionController = require('./controller/transactionController');
const OverviewController = require('./controller/overviewController');

const {loggedIn} = require('./middleware/auth');

const routes = express.Router();

routes.post('/', AuthController.login);
routes.post('/register', AuthController.register);

routes.get('/profile/', loggedIn, UserController.show);
routes.post('/profile/:id', loggedIn, UserController.update);


routes.get('/overview', loggedIn, OverviewController.index);


routes.get('/transaction', loggedIn, TransactionController.index);
routes.get('/transaction/:id', loggedIn, TransactionController.show);
routes.post('/transaction', loggedIn, TransactionController.create);
routes.delete('/transaction/:id', loggedIn, TransactionController.delete);

routes.get('/message', loggedIn, (req, res) => {
  res.json({msg: "Seja bem vindo"});
});

// routes.get('/list', loggedIn, UserController.index);

module.exports = routes;