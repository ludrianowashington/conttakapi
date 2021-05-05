const connection = require('../database/connection')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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


      await connection('users').insert({
        email,
        name,
        lastname,
        username,
        password
      });

    }

    return response.json({ msg: 'Register is gone with success!' })
  },

  async login(request, response) {
    const { email, pass } = request.body;

    const user = await connection('users')
      .where('email', email)
      .select('*')
      .first();

    if (user) {
      const validPass = await bcrypt.compare(pass, user.password);

      if (!validPass)
        return response.status(400).json({msg: 'Email or Password is wrong!'})

      const token = jwt.sign({ id: user.id, user: user.username }, process.env.SECRET_KEY, {
        expiresIn: 14400
      });

      user.password = undefined;

      response.header("Authorization", token).json({ user, token });

    }

  }
}