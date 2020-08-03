
exports.up = function(knex) {
  return knex.schema.table('users', tbl => {
    tbl.string('first_name')
    tbl.string('last_name')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
