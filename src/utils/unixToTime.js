const unixToTime = (s) => {
  const dtFormat = new Date(s * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return dtFormat;
};

export default unixToTime;
