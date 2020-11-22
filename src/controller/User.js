const connection = require('../database/connection');

module.exports = {
  async list(request, response) {
    const user = await connection('user').select("*");

    return response.json(user);
  }
  
}