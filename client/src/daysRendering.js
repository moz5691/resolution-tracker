import dateFns from 'date-fns';

export default function daysRendering(currentMonth, selectedDate) {
  const monthStart = dateFns.startOfMonth(currentMonth);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);

  const dayFormat = 'D';
  const dateFormat = 'YYYY-MM-DD';
  const thisMonth = dateFns.format(currentMonth, dateFormat) + 'T00:00:00.000Z';

  let days = [];
  let day = startDate;
  let formattedDay = '';
  let formattedDate = '';
  let formattedStartDate = '';

  for (let i = 0; i < 35; i++) {
    formattedDay = dateFns.format(day, dayFormat);
    formattedDate = dateFns.format(day, dateFormat) + 'T00:00:00.000Z';
    formattedStartDate =
      dateFns.format(startDate, dateFormat) + 'T00:00:00.000Z';
    // const cloneDay = day;
    let disabled = false;
    if (!dateFns.isSameMonth(day, monthStart)) {
      disabled = true;
    }

    // startDate to tell which page it should be on.
    days.push({
      day: day,
      startDate: formattedStartDate,
      formattedDay: formattedDay,
      formattedDate: formattedDate,
      thisMonth: thisMonth,
      book: false,
      food: false,
      heart: false,
      weight: false,
      disabled: disabled
    });
    day = dateFns.addDays(day, 1);
    // console.log(day);
  }
  return days;
}
