module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/petstore'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
};
