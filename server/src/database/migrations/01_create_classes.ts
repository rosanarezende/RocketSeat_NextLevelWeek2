import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('classes', table => {
    table.increments('id').primary();
    table.string('subject').notNullable();
    table.decimal('cost').notNullable();

    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE') // se o id for alterado na tabela de usuários, reflete a alteração em todos os lugares que dependem daquela informação
      .onDelete('CASCADE') // se o prof é deletado da plataforma, todas as aulas dele tb são
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('classes')
}
