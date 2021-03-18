import { HalfCircleSpinner } from 'react-epic-spinners';
import styles from './Spinner.module.scss';

const Spinner = () => (
  <HalfCircleSpinner className={styles.spinner} color="#6960e4" size={45} />
);

export default Spinner;
