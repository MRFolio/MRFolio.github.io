import { BsArrowRight } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import styles from './RecentLocation.module.scss';

const RecentLocation = ({ location }) => {
  const history = useHistory();

  const handleClick = () => {
    const city = 'Tartu';
    history.push(`/location/${city}`);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{location}</h3>
      <button type="button" onClick={handleClick} className={styles.button}>
        <span className={styles.text}>Check weather</span>
        <BsArrowRight className={styles.icon} />
      </button>
    </div>
  );
};

export default RecentLocation;
