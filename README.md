# lesson-schedule-react

Lesson Schedule component for everyone to use

```typescript
const TimetableComponent = makeTimeTable({
  title: "Lesson Schedule",
});
```

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
