const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const userTransactions = await connection('transaction')
      .select("*");
    
    return response.json(userTransactions);
  },

  async create(request, response){
    const userId = request.user.id;
    const {
      name, 
      value, 
      category, 
      count, 
      date, 
      description, 
      type
    } = request.body;
    
    await connection('transaction').insert({
      name, 
      value, 
      category, 
      count,
      date,
      description,
      type, 
      user_id: userId
    })

    return response.json({ msg: 'Register is gone with success!'});
  },

  async show(request, response) {
    const {id} = request.params;
    const userId = request.user.id;

    const user = await connection('transaction')
      .where('id', id)
      .andWhere('user_id', userId)
      .select('*')
      .first();

    // user.count = undefined;
    user.user_id = undefined;

    return response.json(user);

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
    
  },

  async delete(request, response) {
    const {id} = request.params;

    await connection('transaction')
      .where('id', id)
      .del()

    return response.json({msg: 'Transaction deleted with success!'})
  }
}