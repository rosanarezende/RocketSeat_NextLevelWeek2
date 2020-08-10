import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

export interface Teacher {
  id: number;
  avatar: string;
  subject: string;
  cost: number;
  name: string;
  whatsapp: string;
  bio: string;
}

const TeacherList: React.FC = () => {
  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  const [teachers, setTeachers] = useState([])

  const searchTeachers = async (e: FormEvent) => {
    e.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })

    setTeachers(response.data)
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Essas são as mentoras disponíveis">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Linguagem/Framework"
            options={[
              { value: 'JavaScript', label: 'JavaScript' },
              { value: 'Typescript', label: 'Typescript' },
              { value: 'Java', label: 'Java' },
              { value: 'Ruby', label: 'Ruby' },
              { value: 'Python', label: 'Python' },
              { value: 'SQL', label: 'SQL' }
            ]}
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />

          <Select
            name="week_day"
            label="Dia da semana"
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
            value={week_day}
            onChange={e => setWeekDay(e.target.value)}
          />

          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={e => setTime(e.target.value)}
          />

          <button type="submit">
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
      </main>
    </div>
  );
};

export default TeacherList;
