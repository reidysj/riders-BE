
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments()
        tbl.string('username').unique().notNullable()
        tbl.string('password').unique().notNullable()
        tbl.string('email')
        tbl.text('address')
        tbl.string('city')
        tbl.string('state')
        tbl.string('phone')
        tbl.boolean('share_contact_info')
        tbl.integer('user_type')
        tbl.timestamp('account_created_at').defaultTo(knex.fn.now())
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
  };
  