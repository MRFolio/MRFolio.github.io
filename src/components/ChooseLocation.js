import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorMessage, Form, Spinner } from '../components';
import { useWeatherContext } from '../store/WeatherContext';
import styles from './ChooseLocation.module.scss';

const API_ENDPOINT = 'https://api.openweathermap.org/geo/1.0/reverse?';
const { REACT_APP_API_KEY } = process.env;

const ChooseLocation = () => {
  const { addLocationToRecentlyViewedList } = useWeatherContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const reverseGeocode = async (latitude, longitude) => {
    const reverseGeoUrl = `${API_ENDPOINT}lat=${latitude}&lon=${longitude}&limit=1&appid=${REACT_APP_API_KEY}`;
    setError(undefined);
    setLoading(true);

    try {
      const response = await fetch(reverseGeoUrl);
      const data = await response.json();

      if (!response.ok || !data) {
        throw new Error("Can't find location");
      }

      return data[0].name;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    const success = async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const locationName = await reverseGeocode(lat, lon);

      if (locationName) {
        addLocationToRecentlyViewedList(locationName);
        history.push(`/location/${lat}_${lon}`);
      }
    };

    const error = () => {
      setError('Unable to retrieve your location');
    };

    !navigator.geolocation
      ? setError('Geolocation is not supported by your browser')
      : navigator.geolocation.getCurrentPosition(success, error);
  };

  return (
    <section className={styles.locationContainer}>
      <Form />
      <button
        className={styles.locationBtn}
        type="button"
        aria-label="Select my current location for weather information"
        onClick={handleClick}
      >
        <span className={styles.locationBtnText}>
          Select my current location
        </span>
      </button>
      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}
    </section>
  );
};

export default ChooseLocation;
