import React from 'react';
import { IBaseID, IBaseName, IGeneralSchedule } from './IGeneralSchedule';

export interface ISchedule extends IGeneralSchedule {
  subject?: ISubject;
  auditorium?: IAuditorium;
  trainingType?: IBaseName;
  employee?: IBaseID;
}

export interface ISubject extends IBaseName {
  id?: number;
}

export interface IAuditorium {
  code?: number;
  name: string;
  auditoriumType?: IBaseName;
  building?: IBaseID;
}

export interface ScheduleComponentProps {
  schedule: IGeneralSchedule;
  style: React.CSSProperties;
  onClick: () => any;
  themeColor?: 'light' | 'dark';
}
