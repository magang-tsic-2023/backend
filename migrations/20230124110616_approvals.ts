// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('approvals', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('document_id').unsigned()
    table.uuid('approver_id').unsigned()
    table.foreign('document_id').references('id').inTable('documents')
    table.foreign('approver_id').references('id').inTable('users')
    table.integer('status').defaultTo('0')
    table.integer('level').notNullable()
    table.string('note').defaultTo('-')
    table.dateTime('created_at').notNullable()
    table.dateTime('updated_at').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('approvals')
}
