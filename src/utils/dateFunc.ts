import { MonthNamesType } from '../types/DateTypes';
import moment from 'moment';

/**
 * "03:59"
 * @param date
 * @returns
 */
export const convertDateToTimeString = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const getDateAfterDays = (prevDate: Date, step: number = 1) => {
  const newDate = new Date(prevDate);
  newDate.setDate(prevDate.getDate() + step);
  return newDate;
};

export const currentDate =
  new Date().toISOString().slice(0, 10) + `T00:00:00.000Z`;
export const currentEpochTime = new Date(currentDate).getTime();

/**
 * 08:30 -> 8*60+30
 * @param timeString
 * @returns
 */
export const timeStringToMinutes = (timeString: string) => {
  try {
    if (!timeString && typeof timeString !== 'string') {
      throw new Error('Error on time format!');
    }
    const arr = timeString
      ?.split(':')
      .map((val: string) => Number.parseInt(val));
    const hours = arr && arr[0];
    const minutes = arr && arr[1];
    if (hours === undefined || minutes === undefined)
      throw new Error('Error on time format!');
    const totalMinutes = hours * 60 + minutes;
    return totalMinutes;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Kunning qaysidir qismidagi "timestamp"dan, o'sha kunning "timeString" vaqtiga o'tkazish
 * @param timestamp
 * @param timeString
 * @returns
 */
export const setTimeToTimestamp = (timestamp: number, timeString: string) => {
  const date = moment.unix(timestamp);
  const timeParts = timeString.split(':');
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  date.set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });
  const newTimestamp = date.unix();
  return newTimestamp;
};

/**
 * Bir xil kundami
 * @param timestamp1
 * @param timestamp2
 * @returns
 */
export const areTimestampsInSameDay = (
  timestamp1: number,
  timestamp2: number
) => {
  const date1 = moment.unix(timestamp1);
  const date2 = moment.unix(timestamp2);
  return date1.isSame(date2, 'day');
};

/**
 * schedule status: 
    "processing" -> dars hozir:yashil, 
    "future" -> dars hali boshlanmagan:ko'k,
    "completed" -> dars tugagan:qizil
 * @param startTime 
 * @param endTime 
 * @returns 
 */
export const getStatus = (
  startTime: number,
  endTime: number
): 'processing' | 'future' | 'completed' => {
  const now = moment();
  const start = moment.unix(startTime);
  const end = moment.unix(endTime);

  if (now.isBetween(start, end, null, '[]')) {
    return 'processing';
  } else if (now.isBefore(start)) {
    return 'future';
  } else {
    return 'completed';
  }
};

/**
 * Oxirgi dushanba topish
 * @param timestamp
 * @returns
 */
export const getLatestMondayUnixTimestamp = (timestamp: number) => {
  const date = moment.unix(timestamp);
  const daysToSubtract = date.day() === 1 ? 0 : (date.day() + 6) % 7;
  const latestMonday = date.subtract(daysToSubtract, 'days');
  return latestMonday.startOf('day').unix();
};

/**
 * Agar kun formatda -> kunning o'zini qaytarish, yakshanbasiz
 * Agar hafta formatda -> oxirgi dushanba
 * @param unixDate
 * @param activeOption
 * @returns
 */
export const getStartingDateUnixTimeStamp = (
  unixDate: number = moment().unix(),
  activeOption: 'month' | 'week' | 'day' | 'semester'
) => {
  const date = moment.unix(unixDate);
  if (date.day() === 0) {
    date.add(1, 'day');
  }

  if (activeOption === 'day') {
    return date.startOf('day').unix();
  }
  if (activeOption === 'week') {
    return getLatestMondayUnixTimestamp(date.unix());
  }
  if (activeOption === 'month') {
    return date.startOf('month').unix();
  }

  return;
};

/**
 * Kun oy: 18 May
 * @param timestamp
 * @returns
 */
export const formatUnixTimestampToDate = (
  timestamp: number,
  sep: string = ' ',
  monthNames: MonthNamesType
) => {
  const date = moment.unix(timestamp);
  const day = date.date();
  const monthIndex = date.month();
  if (monthIndex >= 0 && monthIndex <= 11)
    return `${day}${sep}${monthNames[monthIndex]}`;
  return;
};

/**
 * Yakshanbasiz o'tkazish: Juma, Shanba, Dushanba
 * @param steps
 * @param stepType
 * @param setDateFunc
 */
export const handleClickDateChangerBtn = (
  steps: number,
  stepType: 'week' | 'day' | 'month' | 'semester',
  setDateFunc: (arg: (prev: number) => number) => void
) => {
  setDateFunc((prev: number): number => {
    if (stepType === 'semester') return 0;

    const date = moment.unix(prev);
    if (date.day() === 6 && steps === 1 && stepType === 'day')
      return date.add(2, 'days').unix();
    if (date.day() === 1 && steps === -1 && stepType === 'day')
      return date.add(-2, 'days').unix();
    return date.add(steps, stepType).unix();
  });
};
