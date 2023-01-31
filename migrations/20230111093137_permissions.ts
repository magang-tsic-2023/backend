// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'
import { permissionDataRoles } from './data'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('permissions', (table) => {
    table.increments('id')
    table.string('permission_name')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('permissions')
}
