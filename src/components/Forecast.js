import { formatIcon, unixToWeekDay } from '../utils';
import styles from './Forecast.module.scss';

const Forecast = ({ forecast }) => (
  <article className={styles.forecastContainer}>
    {forecast.map((day, index) => {
      const { icon, temp, time, wind_speed } = day;
      const weekDay = index === 0 ? 'Tomorrow' : unixToWeekDay(time);

      return (
        <div key={day.time} className={styles.cardContainer}>
          <p className={styles.weekDay}>{weekDay}</p>
          <div className={styles.icon}>{formatIcon(icon)}</div>
          <p className={styles.temp}>{temp.toFixed(1)}&#176;C</p>
          <p className={styles.wind}>{wind_speed.toFixed(0)} m/s</p>
        </div>
      );
    })}
  </article>
);

export default Forecast;
