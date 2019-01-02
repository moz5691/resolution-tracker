//need to evaluate until today...///////
import dateFns from 'date-fns';

export default (data, key) => {
  let countStreak = { currentStreak: 0, highestStreak: 0 };
  let { currentStreak, highestStreak } = countStreak;
  let prevData = true;
  data.forEach(d => {
    if (dateFns.compareDesc(d.formattedDate, dateFns.endOfToday()) === 1) {
      if (d[key] && prevData) {
        currentStreak++;
        prevData = d[key];
      } else {
        prevData = true;
        if (currentStreak > highestStreak) highestStreak = currentStreak;
        currentStreak = 0;
      }
    }
    console.log('currentStreak', currentStreak, highestStreak);
  });
  console.log('currentStreak', currentStreak, highestStreak);
  return { currentStreak, highestStreak };
};
