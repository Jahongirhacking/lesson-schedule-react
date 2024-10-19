import {
  formatUnixTimestampToDate,
  getStartingDateUnixTimeStamp,
  handleClickDateChangerBtn,
} from '../../utils/dateFunc';
import React from 'react';

import { RightOutlinedSVG } from '../../assets/icon';
import { IGeneralSchedule, ScheduleComponentProps } from '../../types';
import { MonthNamesType, WeekNamesType } from '../../types/DateTypes';
import { Button, Flex, Segmented, Typography } from 'antd';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import TimeTable from '.';

const makeTimeTable = ({
  pixelsForOneCellHeight = 90,
  title = '',
  locales,
  themeColor = 'light',
}: {
  pixelsForOneCellHeight?: number;
  title?: string;
  locales?: {
    today?: string;
    week?: string;
    day?: string;
    weekNames?: WeekNamesType;
    monthNames?: MonthNamesType;
  };
  themeColor?: 'dark' | 'light';
}) => {
  const today = locales?.today || 'Today';
  const week = locales?.week || 'Week';
  const day = locales?.day || 'Day';
  const weekNames = locales?.weekNames || [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ];
  const monthNames = locales?.monthNames || [
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
  ];

  return ({
    schedules: scheduleList,
    activeWeekNumber = 0,
    isLoading = false,
    onScheduleClick = () => {},
    scheduleComponent,
  }: {
    schedules: IGeneralSchedule[];
    activeWeekNumber?: number;
    isLoading?: boolean;
    onScheduleClick?: (id: string | number) => any;
    scheduleComponent?: React.ComponentType<ScheduleComponentProps>;
  }) => {
    const options: { label: string; value: 'week' | 'day' }[] = [
      {
        label: week,
        value: 'week',
      },
      {
        label: day,
        value: 'day',
      },
    ];

    const [activeOption, setActiveOption] = useState<'week' | 'day'>(
      options[0].value
    );

    const [activeDate, setActiveDate] = useState<number>(
      getStartingDateUnixTimeStamp(
        moment().startOf('day').unix(),
        activeOption
      ) as number
    );
    const schedules = scheduleList?.filter(schedule => schedule?.lessonPair);

    const handleDateChange = useCallback(
      (timeStamp: number) => {
        const newDate = getStartingDateUnixTimeStamp(timeStamp, activeOption);
        if (newDate !== timeStamp) {
          setActiveDate(newDate as number);
        }
      },
      [activeOption]
    );

    useEffect(() => {
      handleDateChange(activeDate);
    }, [handleDateChange, activeDate]);

    useEffect(() => {
      setActiveDate(
        getStartingDateUnixTimeStamp(
          moment().startOf('day').unix(),
          activeOption
        ) as number
      );
    }, [activeOption]);

    return (
      <section className={`time-table-section`}>
        <Flex align="center" justify="space-between" wrap gap={15}>
          {title && (
            <Typography.Title level={2} className="section_title">
              {title}
            </Typography.Title>
          )}
          <Flex align="center" gap={10} wrap>
            <Segmented
              value={activeOption}
              options={options}
              onChange={(val: 'week' | 'day') => setActiveOption(val)}
            />
            <Typography.Text
              strong
              style={{
                minWidth: activeOption === 'week' ? '90px' : '65px',
                textAlign: 'center',
              }}
            >
              {activeOption === 'week'
                ? `${formatUnixTimestampToDate(activeDate, ' ', monthNames)} - ${formatUnixTimestampToDate(moment.unix(activeDate).add(5, 'days').unix(), ' ', monthNames)}`
                : `${formatUnixTimestampToDate(activeDate, '-', monthNames)}`}
            </Typography.Text>
            <Flex gap={4}>
              <Button
                icon={<RightOutlinedSVG />}
                style={{ transform: 'rotate(180deg)' }}
                onClick={() =>
                  handleClickDateChangerBtn(-1, activeOption, setActiveDate)
                }
              />
              <Button
                type="primary"
                onClick={() => handleDateChange(moment().unix())}
              >
                {today}
              </Button>
              <Button
                icon={<RightOutlinedSVG />}
                onClick={() =>
                  handleClickDateChangerBtn(1, activeOption, setActiveDate)
                }
              />
            </Flex>
          </Flex>
        </Flex>

        <div
          className="dashboard__outlet--content"
          style={{ marginTop: '20px' }}
        >
          <TimeTable
            {...{
              pixelsForOneCellHeight,
              activeOption,
              activeDate,
              isLoading,
              activeWeekNumber,
              weekNames,
              onScheduleClick,
              scheduleComponent,
              themeColor,
            }}
            schedules={schedules}
          />
        </div>
      </section>
    );
  };
};

export default makeTimeTable;
