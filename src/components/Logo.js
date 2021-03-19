import { useHistory } from 'react-router-dom';
import styles from './Logo.module.scss';

const Logo = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <div
      className={styles.logoContainer}
      role="button"
      title="Navigate to homepage"
      onClick={handleClick}
    >
      <h1 className={styles.firstRow}>
        Where is <s className={styles.strikeWord}>Waldo</s>
      </h1>
      <div className={styles.strikethroughLine}></div>
      <h1 className={styles.secondRow}>the sun</h1>
    </div>
  );
};

export default Logo;
