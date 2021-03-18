import { useEffect, useState } from 'react';
import styles from './Error.module.scss';

const Error = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) {
      setVisible(false);
      return;
    }

    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 6500);

    return () => clearTimeout(timer);
  }, [message]);

  if (!visible) return null;

  return (
    <>
      <p className={styles.errorMessage}>
        <strong>Something went wrong!</strong>
      </p>
      <p className={styles.reason}>{message}</p>
    </>
  );
};

export default Error;
