
exports.up = function(knex) {
  return knex.schema.createTable('user', function (table) {
    table.increments('id');
    table.string('email').notNullable();
    table.string('name').notNullable();
    table.string('lastname').notNullable();
    table.string('username').notNullable();
    table.text('password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');  
};
