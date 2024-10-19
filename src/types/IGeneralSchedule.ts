import React from 'react';
import { ScheduleComponentProps } from './ISchedule';

export interface IGeneralSchedule {
  id?: number | string;
  lessonPair: ILessonPair;
  lesson_date: number;
  scheduleComponent?: React.ComponentType<ScheduleComponentProps>;
  [key: string]: any;
}

export interface ILessonPair {
  start_time: string;
  end_time: string;
}

export interface IBaseName {
  code?: string;
  name: string;
}

export interface IBaseID {
  id?: number;
  name: string;
}
