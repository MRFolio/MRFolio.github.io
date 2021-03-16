const degToCompass = (num) => {
  const value = Math.floor(Number(num) / 22.5 + 0.5);
  const array = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  return array[value % 16];
};

export default degToCompass;
