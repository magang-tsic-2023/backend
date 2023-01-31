import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('documents', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.increments('no', { primaryKey: false })
    table.dateTime('date').notNullable()
    table.string('name').notNullable()
    table.string('url').notNullable()
    table.integer('type').notNullable()
    table.foreign('type').references('id').inTable('docs_types')
    table.string('status').defaultTo('0')
    table.uuid('created_by').unsigned()
    table.uuid('updated_by').unsigned()
    table.foreign('created_by').references('id').inTable('users')
    table.foreign('updated_by').references('id').inTable('users')
    table.dateTime('created_at').notNullable()
    table.dateTime('updated_at').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('documents', function (table) {
    table.dropColumn('id')
    table.dropColumn('no')
    table.dropColumn('date')
    table.dropColumn('name')
    table.dropColumn('url')
    table.dropColumn('status')
    table.dropColumn('created_by')
    table.dropColumn('updated_by')
    table.dropColumn('created_at')
    table.dropColumn('updated_at')
  })
}
