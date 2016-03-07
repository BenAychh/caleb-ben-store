
exports.up = function(knex, Promise) {
  return knex.schema.createTable('customers', function(table) {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('username');
    table.string('password');
    table.string('shipping_address_line1');
    table.string('shipping_address_line2');
    table.string('shipping_address_city');
    table.string('shipping_address_state');
    table.string('shipping_address_zipcode');
    table.string('billing_address_line1');
    table.string('billing_address_line2');
    table.string('billing_address_city');
    table.string('billing_address_state');
    table.string('billing_address_zipcode');
  })
  .then(function() {
    return knex.schema.createTable('inventory', function(table) {
      table.increments();
      table.string('animal_name');
      table.string('animal_type');
      table.string('gender');
      table.integer('age');
      table.string('image_url');
      table.string('origin');
      table.float('price');
      table.boolean('sold');
    });
  })
  .then(function() {
    return knex.schema.createTable('pos_order', function(table) {
      table.increments();
      table.integer('customer_id').references('id').inTable('customers');
      table.integer('product_id').references('id').inTable('inventory');
      table.string('stripe_id');
    });
  });
};

exports.down = function(knex, Promise) {

};
