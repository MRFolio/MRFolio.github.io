import { useEffect, useState } from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import styles from './ErrorMessage.module.scss';

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
    }, 4500);

    return () => clearTimeout(timer);
  }, [message]);

  if (!visible) return null;

  return (
    <p className={styles.errorMessage}>
      <RiErrorWarningFill className={styles.icon} />
      <strong>{message}</strong>
      <RiErrorWarningFill className={styles.icon} />
    </p>
  );
};

export default Error;
