export default (data, key) => {
  let count = 0;
  data.forEach(d => (d[key] ? count++ : null));
  console.log('count', count);
  return count;
};
