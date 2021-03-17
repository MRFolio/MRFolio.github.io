import { formatIcon, unixToWeekDay } from '../utils';
import styles from './WeatherCard.module.scss';

const DailyForecastCard = ({ index, icon, temp, time, wind_speed }) => {
  const weekDay = index === 0 ? 'Tomorrow' : unixToWeekDay(time);

  return (
    <div className={styles.cardContainer}>
      <p className={styles.weekDay}>{weekDay}</p>
      {/* <img
        src={`http://openweathermap.org/img/wn/${icon}.png`}
        alt="weather-icon"
        className={styles.icon}
      /> */}
      <p className={styles.icon}>{formatIcon(icon)}</p>
    </div>
  );
};

export default DailyForecastCard;
