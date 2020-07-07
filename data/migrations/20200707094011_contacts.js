
exports.up = function(knex) {
    return knex.schema.createTable('contacts', tbl => {
        tbl.increments()
        tbl.string('first_name').notNullable()
        tbl.string('last_name').notNullable()
        tbl.string('email').notNullable()
        tbl.string('phone')
        tbl.text('comments')
        tbl.string('type')
        tbl.timestamp('contact_made_at').defaultTo(knex.fn.now())
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('contacts')
  
};
