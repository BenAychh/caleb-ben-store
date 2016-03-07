
exports.up = function(knex, Promise) {
  return knex.schema.table('inventory', function(table) {
    table.date('date_acquired');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('inventory', function(table) {
    table.dropColumn('date_acquired');
  });
};
