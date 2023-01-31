// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'
import { rolesList } from './data'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('roles', (table) => {
    table.increments('id')
    table.string('role_name')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('roles')
}
