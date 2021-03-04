const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const user = await connection('users').select("*");

    return response.json(user);
  },

  async show(request, response) {
    const userId = request.user.id;

    const user = await connection('users')
      .where('id', userId)
      .select('*')
      .first();

    user.password = undefined;

    response.json({ user });

  },

  async update(request, response) {
    const { id } = request.params;
    const {
      email,
      name,
      lastname,
      username,
      password,
      confirm
    } = request.body;

    const user = await connection('users')
      .where('id', id)
      .update({

      })

  }
}