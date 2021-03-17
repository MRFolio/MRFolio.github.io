import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, WeatherCard } from './index';
import styles from './LocationWeather.module.scss';

const LocationWeather = ({ location }) => {
  // const { loading, error, locationWeather } = useWeatherContext();
  const { coordinates } = useParams();

  let locationText;

  if (location && location.state && location.state.locationName) {
    locationText = location.state.locationName;
  } else {
    const url_Array = coordinates.split('_');
    const lat = url_Array[1];
    const lon = url_Array[2];
    locationText = `${lat} ${lon}`;
  }

  console.log(locationText);

  const url_Array = coordinates.split('_');
  const locationName = url_Array[0];
  const lat = url_Array[1];
  const lon = url_Array[2];

  // useEffect(() => {}, [dispatch, category]);

  const [currentLocation, setCurrentLocation] = useState({});
  const [locationWeather, setLocationWeather] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // const getWeatherForecast = useCallback(async (latitude, longitude) => {
  //   setLoading(true);
  //   const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();

  //     const {
  //       dt,
  //       temp,
  //       feels_like,
  //       pressure,
  //       humidity,
  //       wind_deg,
  //       wind_speed,
  //       weather: [{ icon }],
  //     } = data.current;

  //     const currentWeather = {
  //       time: dt,
  //       temp,
  //       feels_like,
  //       pressure,
  //       humidity,
  //       wind_deg,
  //       wind_speed,
  //       icon: icon.slice(0, -1),
  //     };

  //     const forecast = data.daily.slice(1).map((item) => {
  //       const {
  //         dt,
  //         weather: [{ icon }],
  //         temp: { day },
  //         wind_speed,
  //       } = item;

  //       return { time: dt, icon: icon.slice(0, -1), temp: day, wind_speed };
  //     });

  //     const formattedData = {
  //       currentWeather,
  //       forecast,
  //     };
  //     setLocationWeather(formattedData);

  //     return formattedData;
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   getWeatherForecast(lat, lon);
  // }, [getWeatherForecast, lat, lon]);

  // const {
  //   currentWeather: { time, temp, feels_like },
  // } = locationWeather;

  // const {
  //   currentWeather: { temp },
  // } = locationWeather;
  // console.log(temp);

  if (loading) return <Spinner />;

  if (error) {
    return <p>Cannot display weather. Reason: {error}.</p>;
  }

  if (!locationWeather) {
    return <h2>No weather to display</h2>;
  } else {
    const { date } = locationWeather;

    return (
      <section className={styles.container}>
        <article className={styles.currentWeather}>{locationName}</article>
        <div className={styles.cardsContainer}>
          {locationWeather?.forecast?.map((day, index) => (
            <WeatherCard key={day.time} index={index} {...day} />
          ))}
        </div>
      </section>
    );
  }
};

export default LocationWeather;
