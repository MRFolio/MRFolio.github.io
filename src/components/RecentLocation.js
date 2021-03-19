import { BsArrowRight } from 'react-icons/bs';
import { useHistory } from 'react-router';
import useGeocode from '../hooks/useGeocode';
import { useWeatherContext } from '../store/WeatherContext';
import styles from './RecentLocation.module.scss';

const RecentLocation = ({ location }) => {
  const { error, loading, coordinates } = useGeocode(location);
  const { addLocationToRecentlyViewedList } = useWeatherContext();
  const history = useHistory();

  const handleClick = async () => {
    // await geocode(location);
    if (coordinates) {
      const { lat, lon } = coordinates;
      addLocationToRecentlyViewedList(location);
      history.push(`/location/${location}_${lat}_${lon}`);
    }
  };

  return (
    <li className={styles.container}>
      <h3 className={styles.heading}>{location}</h3>
      <button
        type="button"
        aria-label={`Check ${location} weather forecast`}
        title={`Check ${location.toUpperCase()} weather forecast`}
        onClick={handleClick}
        className={styles.button}
      >
        <span className={styles.text}>Check weather</span>
        <BsArrowRight className={styles.icon} />
      </button>
    </li>
  );
};

export default RecentLocation;
