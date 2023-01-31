// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'
import { permissionDataRoles } from './data'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users_roles', (table) => {
    table.uuid('user_id').unsigned()
    table.foreign('user_id').references('id').inTable('users')
    table.integer('role_id')
    table.foreign('role_id').references('id').inTable('roles')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('groups')
}
