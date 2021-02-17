
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('name').notNullable();
    table.string('lastname').notNullable();
    table.string('username').notNullable();
    table.text('password').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
