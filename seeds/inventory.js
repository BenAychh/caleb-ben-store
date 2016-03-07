var seeder = require('knex-csv-seeder').seeder.seed;
exports.seed = seeder({
  table: 'inventory',
  file: 'csvs/inventory.csv',
});
