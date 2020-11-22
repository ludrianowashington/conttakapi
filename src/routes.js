const express = require('express');

const UserController = require('./controller/User');
const AuthController = require('./controller/authController');

const routes = express.Router();

routes.get('/user', UserController.list);
routes.post('/register', AuthController.register);

routes.post('/login',  AuthController.login);

routes.get('/overview', (req, res) => {
  res.send("Seja bem vindo");
});


routes.get('/transaction', (req, res) => {
  res.send("Seja bem vindo");
});


routes.get('/notifications', (req, res) => {
  res.send("Seja bem vindo");
});

routes.get('/profile', (req, res) => {
  res.send("Seja bem vindo");
});



module.exports = routes;