import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <h1 className={styles.firstRow}>Where is Waldo</h1>
      <div className={styles.strikethroughLine}></div>
      <h1 className={styles.secondRow}>the sun</h1>
    </div>
  );
};

export default Logo;
