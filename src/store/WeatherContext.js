import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const WeatherContext = createContext(null);

const WeatherProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [locationWeather, setLocationWeather] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getWeatherForecast = useCallback(async (latitude, longitude) => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const {
        dt,
        temp,
        feels_like,
        pressure,
        humidity,
        wind_deg,
        wind_speed,
        weather: [{ icon }],
      } = data.current;

      const currentWeather = {
        time: dt,
        temp,
        feels_like,
        pressure,
        humidity,
        wind_deg,
        wind_speed,
        icon,
      };

      const forecast = data.daily.slice(1).map((item) => {
        const {
          dt,
          weather: [{ icon }],
          temp: { day },
          wind_speed,
        } = item;

        return { time: dt, icon, temp: day, wind_speed };
      });

      const formattedData = {
        currentWeather,
        forecast,
      };
      setLocationWeather(formattedData);
      //   history.push({
      //     pathname: `/location/${latitude}-${longitude}`,
      //     state: { formattedData },
      //   });

      return formattedData;
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    if (currentLocation.lat && currentLocation.lon) {
      getWeatherForecast(currentLocation.lat, currentLocation.lon);
    }
  }, [currentLocation, getWeatherForecast]);

  return (
    <WeatherContext.Provider
      value={{ setCurrentLocation, locationWeather, loading, error, setError }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

//custom hook
const useWeatherContext = () => useContext(WeatherContext);

export { useWeatherContext, WeatherProvider };
