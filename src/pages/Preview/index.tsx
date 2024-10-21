import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Input,
  message,
  Segmented,
  Slider,
  TimePicker,
  Typography,
} from 'antd';
import moment from 'moment';
import { useMemo, useState } from 'react';
import Schedule from '../../components/Schedule';
import makeTimeTable from '../../components/TimeTable/makeTimeTable';
import { ISchedule } from '../../types/ISchedule';
import { lessonsArray } from './data';
import './style.scss';

const Preview = () => {
  const [schedules, setSchedules] = useState<ISchedule[]>(lessonsArray);
  const [lessonDate, setLessonDate] = useState<number | null>(null);
  const [lessonTime, setLessonTime] = useState<[string, string]>(['', '']);
  const [lessonName, setLessonName] = useState<string>('');
  const [auditoriumName, setAuditoriumName] = useState<string>('');
  const [lessonType, setLessonType] = useState<string>('');
  const [employeeName, setEmployeeName] = useState<string>('');
  const [pixelsForOneCellHeight, setPixelsForOneCellHeight] =
    useState<number>(90);
  const [title, setTitle] = useState<string>('Timetable');
  const [themeColor, setThemeColor] = useState<'light' | 'dark'>('light');

  const handleClick = () => {
    if (
      !auditoriumName ||
      !lessonDate ||
      !lessonTime[0] ||
      !lessonTime[1] ||
      !lessonName ||
      !lessonType ||
      !employeeName
    ) {
      message.error("There mustn't be empty fields on creating a lesson!");
      return;
    }
    setSchedules((prev: ISchedule[]): ISchedule[] => {
      return [
        ...prev,
        {
          id: prev.length,
          auditorium: {
            name: auditoriumName,
          },
          employee: {
            name: employeeName,
          },
          lesson_date: lessonDate || moment().unix(), // Ensure lessonDate is not null
          lessonPair: {
            start_time: lessonTime[0],
            end_time: lessonTime[1],
          },
          subject: {
            name: lessonName,
          },
          trainingType: {
            name: lessonType,
          },
        },
      ] as ISchedule[];
    });
    message.success('Lesson successfully added!').then(() => {
      setAuditoriumName('');
      setEmployeeName('');
      setLessonName('');
      setLessonType('');
    });
  };

  const TimetableComponent = useMemo(
    () =>
      makeTimeTable({
        pixelsForOneCellHeight,
        title,
        locales: {
          today: 'Today',
          week: 'Week',
          day: 'Day',
          weekNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          monthNames: [
            'jan',
            'feb',
            'mar',
            'apr',
            'may',
            'jun',
            'jul',
            'aug',
            'sep',
            'oct',
            'nov',
            'dec',
          ],
        },
        themeColor,
      }),
    [pixelsForOneCellHeight, title, themeColor]
  );

  return (
    <Flex vertical gap={40}>
      <Flex vertical gap={35}>
        <TimetableComponent
          scheduleComponent={Schedule}
          schedules={schedules}
          onScheduleClick={id => {
            message.info(`Element id is: ${id}`);
          }}
          activeWeekNumber={1}
        />

        <Flex vertical gap={15}>
          <Divider>Table Settings</Divider>
          <Flex wrap gap={30} className="table-part">
            <Flex gap={10}>
              <Typography.Text>Mode:</Typography.Text>
              <Segmented
                defaultValue="light"
                options={[
                  {
                    label: 'Light',
                    value: 'light',
                  },
                  {
                    label: 'Dark',
                    value: 'dark',
                  },
                ]}
                onChange={(val: 'dark' | 'light') => setThemeColor(val)}
              />
            </Flex>
            <Flex gap={10}>
              <Typography.Text>Table title:</Typography.Text>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Timetable"
              />
            </Flex>
          </Flex>
          <Flex vertical gap={5}>
            <Typography.Text>Height of a cell: </Typography.Text>
            <Slider
              min={50}
              max={130}
              defaultValue={90}
              onChange={(val: number) => setPixelsForOneCellHeight(val)}
            />
          </Flex>

          <Divider>Lesson creation</Divider>
          <Flex wrap gap={30} className="lesson-part">
            <Flex gap={10}>
              <Typography.Text>Lesson name:</Typography.Text>
              <Input
                value={lessonName}
                onChange={e => setLessonName(e.target.value)}
                placeholder="Mathematics"
              />
            </Flex>
            <Flex gap={10}>
              <Typography.Text>Lesson type:</Typography.Text>
              <Input
                value={lessonType}
                onChange={e => setLessonType(e.target.value)}
                placeholder="Lecture"
              />
            </Flex>
            <Flex gap={10}>
              <Typography.Text>Lesson date:</Typography.Text>
              <Flex wrap>
                <DatePicker
                  onChange={(_, dateString) =>
                    setLessonDate(moment(dateString, 'YYYY-MM-DD').unix())
                  }
                />
                <TimePicker.RangePicker
                  format="HH:mm"
                  onChange={(_, timeString) => setLessonTime(timeString)}
                />
              </Flex>
            </Flex>
            <Flex gap={10}>
              <Typography.Text>Employee name:</Typography.Text>
              <Input
                value={employeeName}
                onChange={e => setEmployeeName(e.target.value)}
                placeholder="John Doe"
              />
            </Flex>
            <Flex gap={10}>
              <Typography.Text>Auditorium name:</Typography.Text>
              <Input
                value={auditoriumName}
                onChange={e => setAuditoriumName(e.target.value)}
                placeholder="Room 218-A"
              />
            </Flex>
          </Flex>
        </Flex>

        <Button
          type="primary"
          onClick={handleClick}
          style={{ margin: 'auto', width: 'min(200px, 100%)' }}
        >
          Add lesson
        </Button>
      </Flex>
      <footer style={{ width: 'auto', margin: 'auto', padding: '20px' }}>
        <Typography>
          &copy; Copyright{' '}
          <a href="https://jahongirhacking.netlify.app/">Jahongir Hayitov</a>
        </Typography>
      </footer>
    </Flex>
  );
};

export default Preview;
