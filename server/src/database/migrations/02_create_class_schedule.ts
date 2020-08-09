import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('class_schedule', table => {
    table.increments('id').primary();
    table.integer('week_day').notNullable();
    table.integer('from').notNullable();
    table.integer('to').notNullable();

    table.integer('class_id')
      .notNullable()
      .references('id')
      .inTable('classes')
      .onUpdate('CASCADE') // se o id for alterado na tabela de usuários, reflete a alteração em todos os lugares que dependem daquela informação
      .onDelete('CASCADE') // se o prof é deletado da plataforma, todas as aulas dele tb são
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('class_schedule')
}
