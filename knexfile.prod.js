// Update with your config settings.

module.exports = {
  client: 'postgres',
  migrations: {
    directory: 'build/infrastructure/db/migrations'
  },
  seeds: {
    directory: 'build/infrastructure/db/seeds'
  }
}
