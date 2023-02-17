// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'
import { permissionDataDocs } from './20230411093111_data'
import { docsTypeList } from './20230411093111_data'

export async function up(knex: Knex): Promise<void> {
  // await knex.schema.createTable('docs_types_permissions', (table) => {
  //   table.integer('doc_type_id').unsigned()
  //   table.foreign('doc_type_id').references('id').inTable('docs_types')
  //   table.integer('permission_id')
  //   table.foreign('permission_id').references('id').inTable('docs_permissions')
  // })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('docs_types_permissions')
}
