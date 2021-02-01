const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const user = await connection('user').select("*");

    return response.json(user);
  },

  async create(request, response){
    const userId = request.user.id;
    const {name, value, category, count, date, description, type} = request.body;
    
  },
  
  async show(request, response) {
    const userId = request.user.id;

    const user = await connection('user')
      .where('id', userId)
      .select('*')
      .first();
    
    user.password = undefined;

    response.json({user});

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

    const user = await connection('user')
      .where('id', id)
      .update({

      })
    
  }
}