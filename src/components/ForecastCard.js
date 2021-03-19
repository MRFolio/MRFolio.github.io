import { formatIcon, unixToWeekDay } from '../utils';
import styles from './ForecastCard.module.scss';

const ForecastCard = ({ index, icon, temp, time, wind_speed }) => {
  const weekDay = index === 0 ? 'Tomorrow' : unixToWeekDay(time);

  // <WeatherCard key={day.time} index={index} {...day} />

  return (
    <div className={styles.cardContainer}>
      <p className={styles.weekDay}>{weekDay}</p>
      <p className={styles.icon}>{formatIcon(icon)}</p>
      <p className={styles.temp}>{temp.toFixed(1)}&#176;C</p>
      <p className={styles.wind}>{wind_speed.toFixed(0)} m/s</p>
    </div>
  );
};

export default ForecastCard;
