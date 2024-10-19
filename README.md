# lesson-schedule-react

Lesson Schedule component for everyone to use

## How To Create A Timetable?

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

Secondly and lastly, use `TimetableComponent` in your code and add the schedule items to its props:

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
<br/>

The Timetable can show weekly or daily and you can see other days by clicking left and right buttons, "Today" button leads you current date which is today: 

![image](https://github.com/user-attachments/assets/125f827e-d37a-4807-a912-f5da17762d8b)

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
## Date And Language
`makeTimeTable` HOC has a prop called `locales`, you can add your language by changing it:

```typescript
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
```
## Timetable Without Configurations
![image](https://github.com/user-attachments/assets/a1d46802-9c65-4df8-90fb-771ca893cc91)

You can import only Timetable itself from the package without configurations (table part with schedule items without buttons on the top):
```typescript
import { TimeTable } from "lesson-schedule-react"
```
and you can use it in your project simply:
```typescript
<TimeTable
  pixelsForOneCellHeight={90}
  activeDate={1729351987}
  activeOption='week'
  schedules={[]}
/>
```

