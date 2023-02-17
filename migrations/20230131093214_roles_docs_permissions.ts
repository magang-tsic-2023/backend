// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'
import { permissionDataDocs } from './20230411093111_data'

export async function up(knex: Knex): Promise<void> {
  // await knex.schema.createTable('roles_docs_permissions', (table) => {
  //   table.integer('role_id')
  //   table.foreign('role_id').references('id').inTable('roles')
  //   table.integer('permission_id')
  //   table.foreign('permission_id').references('id').inTable('docs_permissions')
  // })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('roles_docs_permissions')
}
