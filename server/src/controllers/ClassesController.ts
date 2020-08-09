import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHoursToMinuts';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(req: Request, res: Response) {
    const filters = req.query

    const week_day = filters.week_day as string
    const time = filters.time as string
    const subject = filters.subject as string


    if(!week_day || !time || !subject) {
      return res.status(400).json({
        error: 'Faltam filtros para pesquisar aulas'
      });
    }

    const timeInMinutes = convertHourToMinutes(time)

    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);


    return res.json(classes);
  }

  async create(req: Request, res: Response) {
    const {
      name, avatar, whatsapp, bio, 
      subject , cost, 
      schedule
    } = req.body;
  
    // trx é abreviação pra transaction
    const trx = await db.transaction();
  
    try{
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      });
    
      const user_id = insertedUsersIds[0]
    
      const insertedClassesId = await trx('classes').insert({
        subject,
        cost,
        user_id
      })
    
      const class_id = insertedClassesId[0]
    
      // transformar em minutos
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        const { from, to, week_day } = scheduleItem
        return {
          week_day,
          from: convertHourToMinutes(from),
          to: convertHourToMinutes(to),
          class_id,
        };
      })
    
      await trx('class_schedule').insert(classSchedule)
    
      await trx.commit();
  
      return res.status(201).send();
    }
    catch(err) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro inesperado ao criar nova aula'
      })
    }
  
  }
}
