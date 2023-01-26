// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_profile', (table) => {
    table.uuid('id').unsigned().unique().primary()
    table.foreign('id').references('id').inTable('users')
    table.string('department')
    table.string('position')
    table.dateTime('created_at').notNullable()
    table.dateTime('updated_at').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_profile')
}