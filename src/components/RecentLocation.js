import { memo } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { ErrorMessage, Spinner } from '../components';
import useGeocode from '../hooks/useGeocode';
import styles from './RecentLocation.module.scss';

const RecentLocation = memo(({ location }) => {
  const { error, loading, geocode } = useGeocode();

  const handleClick = async () => {
    await geocode(location);
  };

  if (loading) return <Spinner />;

  return (
    <li className={styles.container}>
      <h3 className={styles.heading}>{location}</h3>
      {error ? (
        <ErrorMessage message={error} />
      ) : (
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
      )}
    </li>
  );
});

export default RecentLocation;
