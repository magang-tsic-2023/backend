import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', function (table) {
    table.dropColumn('text')
    table.string('email').unique()
    table.string('password').notNullable()
    table.integer('role').defaultTo('0')
    table.dateTime('created_at').notNullable()
    table.dateTime('updated_at').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', function (table) {
    table.string('text')
    table.dropColumn('email')
    table.dropColumn('password')
    table.dropColumn('role')
    table.dropColumn('created_at')
    table.dropColumn('updated_at')
  })
}
