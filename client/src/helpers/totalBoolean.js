import dateFns from 'date-fns';

export default (data, key) => {
  let count = 0;
  let total = 0;
  data.forEach(d => {
    if (dateFns.compareDesc(d.formattedDate, dateFns.endOfToday()) === 1)
      return d[key] ? count++ : null;
  });
  return count;
};
