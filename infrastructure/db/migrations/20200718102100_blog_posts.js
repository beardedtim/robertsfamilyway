
exports.up = function(knex) {
  return knex.schema.createTable('blog_posts', table => {
    table.uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))

    table.text('slug')
      .notNullable()
      .unique()
      .comment('What is the path that we want to render this on? Must be unique across blog posts')
    
    table.text('title')
      .notNullable()
      .comment('The title of the blog post')

    table.text('description')

    table.text('body')
      .notNullable()
      .comment('This is the stored HTML body that we want to render. CLEAN THIS BEFORE SAVING/RENDERING!')
    
    table.text('hero')
      .comment('The hero image url to show at the top of the page')
    
    table.timestamps(true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('blog_posts')
};
