import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorMessage, Form, RecentLocation, Spinner } from '../components';
import { useWeatherContext } from '../store/WeatherContext';
import styles from './ChooseLocation.module.scss';

const API_ENDPOINT = 'http://api.openweathermap.org/geo/1.0/reverse?';

const ChooseLocation = () => {
  const {
    recentlyViewed,
    addLocationToRecentlyViewedList,
  } = useWeatherContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const reverseGeocode = async (latitude, longitude) => {
    const reverseGeoUrl = `${API_ENDPOINT}lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.REACT_APP_API_KEY}`;
    setError(undefined);
    setLoading(true);

    try {
      const response = await fetch(reverseGeoUrl);
      const data = await response.json();

      if (response.ok) {
        return data[0].name;
      } else {
        throw new Error("Can't find location");
      }
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
      // const reverseGeoUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.REACT_APP_API_KEY}`;
      // setUrl(reverseGeoUrl);
      // console.log(locationName);
      const locationName = await reverseGeocode(lat, lon);
      // setCurrentLocation({ lat, lon });
      if (locationName) {
        addLocationToRecentlyViewedList(locationName);
        // setRecentlyViewed([...recentlyViewed, location])
        history.push(`/location/${locationName}_${lat}_${lon}`);
      }

      // if (locationName) {
      //   history.push({
      //     pathname: `/location/${locationName}_${lat}_${lon}`,
      //     // pathname: `/location/${lat}_${lon}`,
      //     // state: { locationName },
      //   });
      // }
      // console.log(locationName);
      // history.push(`/location/${locationName}`);
    };

    const error = () => {
      setError('Unable to retrieve your location');
    };

    !navigator.geolocation
      ? setError('Geolocation is not supported by your browser.')
      : navigator.geolocation.getCurrentPosition(success, error);

    // setCurrentLocationCoordinates({
    //   lat: position.coords.latitude,
    //   long: position.coords.longitude,
    // });
  };

  if (loading) return <Spinner />;

  return (
    <>
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
      </section>
      {error && <ErrorMessage message={error} />}
      {Boolean(recentlyViewed.length) && (
        <section className={styles.recentlyContainer}>
          <h2 className={styles.headingRecent}>Recently viewed</h2>
          <ul>
            {recentlyViewed
              .slice(0)
              .reverse()
              .slice(0, 5)
              .map((location, i) => (
                <RecentLocation key={i} location={location} />
              ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default ChooseLocation;
