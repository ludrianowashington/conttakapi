
exports.up = function(knex) {
    return knex.schema.createTable('transaction', function (table) {
        table.increments('id');
        table.string('name').notNullable();
        table.decimal('value').notNullable();
        table.string('category').notNullable();
        table.string('count');
        table.date('date');
        table.text('description');
        table.boolean('type');

        table.integer('user_id').notNullable();

        table
            .foreign("user_id")
            .references('id')
            .inTable('user');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('transaction');  
};
