import { BsArrowLeft } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { Form, Logo } from '../components';
import { useWeatherContext } from '../store/WeatherContext';
import styles from './WeatherHeader.module.scss';

const WeatherHeader = () => {
  const { recentlyViewed } = useWeatherContext();
  const history = useHistory();

  const locationName = recentlyViewed[recentlyViewed.length - 1];
  const capitalizedLocationName =
    locationName[0].toUpperCase() + locationName.substring(1);

  const handleBackClick = () => {
    history.push('/');
  };

  return (
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
        <Form locationName={capitalizedLocationName} />
      </div>
    </header>
  );
};

export default WeatherHeader;
