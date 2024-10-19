# lesson-schedule-react

Lesson Schedule component for everyone to use

## How Create A Timetable?

![image](https://github.com/user-attachments/assets/6e60f750-6f31-460e-adf9-21b5af7c1fbf)
![image](https://github.com/user-attachments/assets/9676fde5-c9cc-4383-91b3-257665e95a16)

```bash
npm i lesson-schedule-react
```
<br/>
Firstly, import `makeTimeTable` HOC from `lesson-schedule-react` package:
```typescript
import { makeTimeTable } from "lesson-schedule-react"
```
and then create a timetable component by calling `makeTimeTable`, you can customize your Timetable by changing the props object given to it

```typescript
const TimetableComponent = makeTimeTable({
  title: 'Lesson Schedule',
  themeColor: 'dark',
  // other props
})
```

<br/>

Secondly, use `TimetableComponent` in your code and add the schedule items to its props:

```typescript
import { ISchedule } from "lesson-schedule-react"
```

```typescript
<TimetableComponent
    schedules={[
      {
        lessonPair: {
          start_time: '19:15',
          end_time: '20:40',
        },
        lesson_date: 1729153744,
        auditorium: {
          name: 'Room 12'
        },
        subject: {
          name: 'Software Analysis'
        },
        trainingType: {
          name: "Lecture",
        },
        employee: {
          name: "Jahongir Hayitov"
        }
      },
      // other scheduled objects
    ] as ISchedule[]}
    activeWeekNumber={12}
    // other props
  />
</>
```

## Custom Schedule Components
![image](https://github.com/user-attachments/assets/b74f5012-5928-4c99-bcd1-15765b8e99bf)
You can add as many custom schedule components as you want

```typescript
<TimetableComponent
  // Default schedule item component
  scheduleComponent={CustomSchedule}
  schedules={[
    {
      lessonPair: {
        start_time: "19:15",
        end_time: "20:40",
      },
      lesson_date: 1729153744,
      text: "Lorem ipsum",
    },
    {
      lessonPair: {
        start_time: "18:00",
        end_time: "19:30",
      },
      lesson_date: 1729341539,
      text: "Hello World Again",
      // Individual schedule item component
      scheduleComponent: AnotherCustomSchedule,
    },
    {
      lessonPair: {
        start_time: "18:05",
        end_time: "21:40",
      },
      lesson_date: 1728980944,
      text: "Hello World",
    },
  ]}
  activeWeekNumber={12}
/>
```

```typescript
import { FC } from 'react'
import moment from 'moment'
// ScheduleComponentProps - a template for creating a Schedule Component 
import { ScheduleComponentProps } from 'lesson-schedule-react'

export const CustomSchedule: FC<ScheduleComponentProps> = ({ schedule, style }) => {
    return (
        <div
            style={{
                // add default style
                ...style,
                // add custom style
                background: '#00F',
                color: '#fff',
                padding: '10px'
            }}
            onClick={() => alert(schedule.text)}
        >
            {/* You can add custom text here */}
            <p>
                {schedule.text} ({schedule.lessonPair.start_time}-{schedule.lessonPair.end_time})
            </p>
            <p>The date: {moment.unix(schedule.lesson_date).format('DD.MM.YYYY')}</p>
        </div >
    )
}

export const AnotherCustomSchedule: FC<ScheduleComponentProps> = ({ schedule, style }) => {
    return (
        <div
            style={{
                // default style
                ...style,
                // custom style
                background: '#F0F',
                color: '#fff',
                padding: '30px',
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onClick={() => alert(schedule.text)}
        >
            {/* You can add custom text here */}
            <p>
                {schedule.text} ({schedule.lessonPair.start_time}-{schedule.lessonPair.end_time})
            </p>
            <p>The date: {moment.unix(schedule.lesson_date).format('DD.MM.YYYY')}</p>
        </div >
    )
}
```
