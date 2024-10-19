import { ISchedule } from '../../types/ISchedule';
import { getStatus, setTimeToTimestamp } from '../../utils/dateFunc';
import { Card, Flex, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import style from './Schedule.module.scss';
import './style.scss';

const Schedule = ({
  schedule,
  style: scheduleStyle = {},
  onClick = () => {},
  themeColor = 'light',
}: {
  schedule: ISchedule;
  style?: React.CSSProperties;
  onClick?: () => any;
  themeColor?: 'light' | 'dark';
}) => {
  const [status, setStatus] = useState(
    getStatus(
      setTimeToTimestamp(schedule.lesson_date, schedule.lessonPair?.start_time),
      setTimeToTimestamp(schedule.lesson_date, schedule.lessonPair?.end_time)
    )
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStatus(
        getStatus(
          setTimeToTimestamp(
            schedule.lesson_date,
            schedule.lessonPair?.start_time
          ),
          setTimeToTimestamp(
            schedule.lesson_date,
            schedule.lessonPair?.end_time
          )
        )
      );
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    schedule.lessonPair.start_time,
    schedule.lessonPair.end_time,
    schedule.lesson_date,
  ]);

  const colors = {
    completed: themeColor === 'dark' ? '#291321' : '#fff0f6',
    processing: themeColor === 'dark' ? '#162312' : '#f6ffed',
    future: themeColor === 'dark' ? '#111A2C' : '#e6f4ff',
  };

  const scheduleStatus = `${
    status === 'completed'
      ? 'red'
      : status === 'processing'
        ? 'green'
        : status === 'future'
          ? 'blue'
          : ''
  }-bg-card`;

  const timeRange = `${schedule?.lessonPair?.start_time} - ${schedule?.lessonPair?.end_time}`;

  const handleScheduleClick = () => {
    onClick();
  };

  return (
    <Card
      className={`schedule-card ${style['schedule-card']} ${style[scheduleStatus]}`}
      style={{
        ...scheduleStyle,
        backgroundColor:
          status === 'completed'
            ? colors.completed
            : status === 'processing'
              ? colors.processing
              : colors.future,
      }}
      hoverable
      onClick={handleScheduleClick}
    >
      <Flex
        vertical
        className={style['schedule-wrapper']}
        style={{
          minHeight: `calc(${scheduleStyle.height} - 8px)`,
          maxHeight: `calc(${scheduleStyle.height} - 8px)`,
          overflowY: 'auto',
          scrollbarColor: `${status === 'completed' ? '#c41d7e30' : status === 'future' ? '#0958d930' : '#389e0d30'} transparent`,
        }}
        justify="space-between"
        gap={10}
      >
        <Flex vertical justify="space-between" gap={10}>
          <Typography.Text strong>{schedule?.subject?.name}</Typography.Text>
          <Flex gap={8} wrap>
            <Typography.Text>{schedule?.trainingType?.name}</Typography.Text>
            <Typography.Text>{`(${schedule?.employee?.name})`}</Typography.Text>
          </Flex>
        </Flex>
        <Flex gap={5} wrap align="center">
          <Typography.Text>{timeRange}</Typography.Text>
          <Typography.Text strong>{schedule?.auditorium?.name}</Typography.Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Schedule;
