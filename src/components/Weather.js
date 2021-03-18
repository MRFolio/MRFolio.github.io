import { useCallback, useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useHistory, useParams } from 'react-router-dom';
import {
  ErrorMessage,
  FormInput,
  Logo,
  Spinner,
  WeatherCard,
} from '../components';
import styles from './Weather.module.scss';

const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall?';
const API_EXCLUDE = '&exclude=hourly,minutely,alerts';

const Weather = () => {
  const [locationWeather, setLocationWeather] = useState({});
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

        const currentWeather = {
          time: dt,
          temp,
          feels_like,
          pressure,
          humidity,
          wind_deg,
          wind_speed,
          icon: icon.slice(0, -1),
        };

        const forecast = data.daily.slice(1).map((dayForecast) => {
          const {
            dt,
            weather: [{ icon }],
            temp: { day },
            wind_speed,
          } = dayForecast;

          return { time: dt, icon: icon.slice(0, -1), temp: day, wind_speed };
        });

        setLocationWeather({ currentWeather, forecast });

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

  const {
    icon,
    temp,
    time,
    feels_like,
    pressure,
    humidity,
    wind_speed,
    wind_deg,
  } = locationWeather.current || {};

  const handleBackClick = () => {
    history.push('/');
  };

  const renderWeather = () => {
    if (loading) return <Spinner />;

    if (error || !locationWeather) {
      return <ErrorMessage message={error} />;
    }

    return (
      <section className={styles.weatherContainer}>
        <article className={styles.currentWeather}>
          <div className={styles.leftContainer}></div>
          <div className={styles.rightContainer}></div>
        </article>
        <article className={styles.forecastContainer}>
          {locationWeather?.forecast?.map((day, index) => (
            <WeatherCard key={day.time} index={index} {...day} />
          ))}
        </article>
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
          <FormInput locationName={locationName} />
        </div>
      </header>
      {renderWeather()}
    </>
  );
};

export default Weather;
