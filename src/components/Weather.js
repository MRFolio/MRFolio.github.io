import { useCallback, useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useHistory, useParams } from 'react-router-dom';
import { Error, FormInput, Logo, Spinner, WeatherCard } from '../components';
import styles from './Weather.module.scss';

const Weather = ({ location }) => {
  // const { loading, error, locationWeather } = useWeatherContext();
  // const [currentLocation, setCurrentLocation] = useState({});
  const [locationWeather, setLocationWeather] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { coordinates } = useParams();
  const history = useHistory();

  const url_Array = coordinates.split('_');
  const locationName = url_Array[0];
  const lat = url_Array[1];
  const lon = url_Array[2];

  // let locationText;

  // if (location && location.state && location.state.locationName) {
  //   locationText = location.state.locationName;
  // } else {
  //   const url_Array = coordinates.split('_');
  //   const lat = url_Array[1];
  //   const lon = url_Array[2];
  //   const locationText = `${lat} ${lon}`;
  // }

  // useEffect(() => {}, [dispatch, category]);

  const getWeatherForecast = useCallback(async (latitude, longitude) => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

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

        const forecast = data.daily.slice(1).map((item) => {
          const {
            dt,
            weather: [{ icon }],
            temp: { day },
            wind_speed,
          } = item;

          return { time: dt, icon: icon.slice(0, -1), temp: day, wind_speed };
        });

        const formattedData = {
          currentWeather,
          forecast,
        };
        setLocationWeather(formattedData);
      } else {
        throw 'Bad API request.';
      }

      return data;
    } catch (error) {
      setError(error);
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

  // const {
  //   currentWeather: { time, temp, feels_like },
  // } = locationWeather;

  // const {
  //   currentWeather: { temp },
  // } = locationWeather;
  // console.log(temp);

  const handleBackClick = () => {
    history.push('/');
  };

  const renderWeather = () => {
    if (loading) return <Spinner />;

    if (error || !locationWeather) {
      return <Error message={error} />;
    }
    return (
      <section className={styles.weatherContainer}>
        <article className={styles.currentWeather}>
          <div className={styles.leftContainer}></div>
          <div className={styles.rightContainer}></div>
        </article>
        <div className={styles.cardsContainer}>
          {locationWeather?.forecast?.map((day, index) => (
            <WeatherCard key={day.time} index={index} {...day} />
          ))}
        </div>
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
