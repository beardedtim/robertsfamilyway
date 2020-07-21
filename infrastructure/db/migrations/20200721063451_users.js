
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))

    table.text('email')
      .unique()
      .notNullable()
    
    table.text('password')
      .notNullable()
      .comment('MUST BE HASHED BEFORE STORING')
    
    table.timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('NOW()'))
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
