import moment from 'moment';

export const lessonsArray = [
  {
    id: '77',
    auditorium: {
      name: 'Room 65-B',
    },
    employee: {
      name: 'Hayitov J. A.',
    },
    lesson_date: moment().unix(), // Ensure lessonDate is not null
    lessonPair: {
      start_time: '08:30',
      end_time: '09:50',
    },
    subject: {
      name: 'Software Design & Analysis',
    },
    trainingType: {
      name: 'Lecture',
    },
  },
  {
    id: '78',
    auditorium: {
      name: 'Room 68-A',
    },
    employee: {
      name: 'Hayitov J. A.',
    },
    lesson_date: moment().unix(), // Ensure lessonDate is not null
    lessonPair: {
      start_time: '10:30',
      end_time: '11:50',
    },
    subject: {
      name: 'Data Structures & Algorithms',
    },
    trainingType: {
      name: 'Lab',
    },
  },
  {
    id: '79',
    auditorium: {
      name: 'Room 65-B',
    },
    employee: {
      name: 'Hayitov J. A.',
    },
    lesson_date: moment().unix(), // Ensure lessonDate is not null
    lessonPair: {
      start_time: '12:20',
      end_time: '14:15',
    },
    subject: {
      name: 'Software Design & Analysis',
    },
    trainingType: {
      name: 'Tutorial',
    },
  },
];
