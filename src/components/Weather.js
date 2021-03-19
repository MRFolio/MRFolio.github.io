import { useCallback, useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useHistory, useParams } from 'react-router-dom';
import {
  CurrentWeather,
  ErrorMessage,
  Forecast,
  Form,
  Logo,
  Spinner,
} from '../components';
import styles from './Weather.module.scss';

const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall?';
const API_EXCLUDE = '&exclude=hourly,minutely,alerts';

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { coordinates } = useParams();
  const history = useHistory();

  const url_Array = coordinates.split('_');
  const locationName = url_Array[0];
  const lat = url_Array[1];
  const lon = url_Array[2];

  const getWeatherForecast = useCallback(async (latitude, longitude) => {
    const url = `${API_ENDPOINT}lat=${latitude}&lon=${longitude}${API_EXCLUDE}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
    setError(undefined);
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
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

        const currentWeatherData = {
          time: dt,
          temp: temp.toFixed(),
          feels_like: feels_like.toFixed(),
          pressure,
          humidity,
          wind_deg,
          wind_speed,
          icon: icon.slice(0, -1),
        };

        setCurrentWeather(currentWeatherData);

        const forecastData = data.daily.slice(1).map((dayForecast) => {
          const {
            dt,
            weather: [{ icon }],
            temp: { day },
            wind_speed,
          } = dayForecast;

          return { time: dt, icon: icon.slice(0, -1), temp: day, wind_speed };
        });

        setForecast(forecastData);

        return data;
      } else {
        throw new Error('Bad API request');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getWeatherForecast(lat, lon);
  }, [getWeatherForecast, lat, lon]);

  const handleBackClick = () => {
    history.push('/');
  };

  const renderWeather = () => {
    if (loading) return <Spinner />;

    if (error) {
      return <ErrorMessage message={error} />;
    }

    return (
      <section className={styles.weatherContainer}>
        <CurrentWeather {...currentWeather} />
        <Forecast forecast={forecast} />
      </section>
    );
  };

  return (
    <>
      <header className={styles.weatherHeader}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.locationContainer}>
          <button
            className={styles.backBtn}
            aria-label="Navigate back to homepage"
            title="Navigate back to homepage"
            type="button"
            onClick={handleBackClick}
          >
            <BsArrowLeft />
          </button>
          <Form locationName={locationName} />
        </div>
      </header>
      {renderWeather()}
    </>
  );
};

export default Weather;
