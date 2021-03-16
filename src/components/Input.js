import { useEffect, useState } from 'react';
import styles from './Input.module.scss';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const Input = () => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const fetchCurrentCityWeather = async (city) => {
  //     const url = `${API_BASE_URL}?&q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
  //     setLoading(true);

  //     try {
  //       const response = await fetch(url);
  //       const data = await response.json();
  //       if (data) {
  //       } else {
  //         setError('Something went wrong. Nothing to show.');
  //       }
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCurrentCityWeather('tartu');
  // }, [query]);

  useEffect(() => {
    if (currentLocation.lat && currentLocation.lon) {
      const getWeatherForecast = async (latitude, longitude) => {
        setLoading(true);
        try {
          const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);

          const {
            current: {
              temp,
              feels_like,
              pressure,
              humidity,
              wind_deg,
              wind_speed,
            },
          } = data;

          return data;
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      getWeatherForecast(currentLocation.lat, currentLocation.lon);
    }
  }, [currentLocation]);

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  };

  return (
    <button className={styles.locationBtn} type="button" onClick={handleClick}>
      <span className={styles.locationBtnText}>Select my current location</span>
    </button>
  );
};

export default Input;
