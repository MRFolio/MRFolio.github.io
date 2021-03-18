import { BsArrowRight } from 'react-icons/bs';
import styles from './RecentLocation.module.scss';

const RecentLocation = ({ location }) => {
  const handleClick = async () => {
    // await geocode(location);
  };

  return (
    <li className={styles.container}>
      <h3 className={styles.heading}>{location}</h3>
      <button
        type="button"
        aria-label={`Check ${location} weather forecast`}
        title={`Check ${location} weather forecast`}
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
