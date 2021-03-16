const unixToWeekDay = (dateUnix) => {
  const date = new Date(Number(dateUnix) * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export default unixToWeekDay;
