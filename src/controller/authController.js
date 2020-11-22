const connection = require('../database/connection')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {
  async register(request, response) {
    const { email, name, lastname, username, pass, confirm } = request.body;

    const password = await bcrypt.hash(pass, 10);
    
    const isSame = await bcrypt.compare(confirm, password);

    if (!password || !confirm) {
      response.json({ msg: 'Register failed! Try again... ' });
    } else if (isSame === false) {
      response.json({ msg: 'Password is not match! Try again... ' });
    } else {
      

      await connection('user').insert({
        email,
        name,
        lastname,
        username,
        password
      });
      
    }
    
    return response.json({ msg: 'Register is gone with success!'})
  },

  async login(request, response) {
    const { email, pass } = request.body;

    const user = await connection('user')
      .where('email', email)
      .select('*')
      .first();    
    
    if (user) {
      const validPass = await bcrypt.compare(pass, user.password);

      if (!validPass)
        return response.status(400).json('Email or Password is wrong!')

      const token = jwt.sign({id: user.id}, authConfig.secret, {
        expiresIn: 300
      });
      
      user.password = undefined;
      
      
      
      return response.json({ user, token })
    }
    
  } 
}