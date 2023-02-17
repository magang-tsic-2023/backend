// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'
import { docsTypeList } from './20230411093111_data'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('docs_types', (table) => {
    table.increments('id').unique().primary()
    table.string('name')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('docs_types')
}
