// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'
import { rolesList } from './20230411093111_data'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('roles', (table) => {
    table.increments('id').unique().primary()
    table.string('name')
  })
  await knex('roles').insert({ id: 0, name: 'Super Admin' })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('roles')
}
