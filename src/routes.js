const express = require('express');

const UserController = require('./controller/User');
const AuthController = require('./controller/authController');

const {loggedIn} = require('./middleware/auth')

const routes = express.Router();

routes.get('/user', loggedIn, UserController.list);
routes.post('/register', AuthController.register);

routes.post('/', AuthController.login);

routes.get('/overview', loggedIn, (req, res) => {
  res.json({msg: "Seja bem vindo", id: req.user.id, user: req.user.user });
});


routes.get('/transaction', loggedIn, (req, res) => {
  res.json({msg: "Seja bem vindo"});
});


routes.get('/notifications', loggedIn, (req, res) => {
  res.json({msg: "Seja bem vindo"});
});

routes.get('/profile', loggedIn, (req, res) => {
  res.json({msg: "Seja bem vindo"});
});



module.exports = routes;