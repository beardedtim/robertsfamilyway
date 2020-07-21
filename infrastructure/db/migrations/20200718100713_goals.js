
exports.up = function(knex) {
  return knex.schema.createTable('goals', table => {
    table.uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))

    table.text('title')
      .comment('The human readable title of this goal')

    table.text('description')
      .comment('The human readable description of this goal')
    
    table.integer('priority')
      .comment('How important is this goal? 0 being most important, 10 being least important')
    
    table.timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('NOW()'))
      .comment('When was this goal created?')
    
    table.timestamp('due_by')
      .notNullable()
      .comment('When is this goal due by? Every goal MUST have a due_by date')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('goals')
};
