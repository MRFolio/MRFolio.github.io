import { degToCompass, formatIcon, unixToTime } from '../utils';
import styles from './CurrentWeather.module.scss';

const CurrentWeather = ({
  icon,
  temp,
  time,
  feels_like,
  pressure,
  humidity,
  wind_speed,
  wind_deg,
}) => {
  const compassDirection = degToCompass(wind_deg);
  const formattedTime = unixToTime(time);

  const weatherInfo = [
    { label: 'Temperature', value: `${temp}°C` },
    {
      label: 'Wind',
      value: `${wind_speed} m/s, ${compassDirection}`,
    },
    { label: 'Feels like', value: `${feels_like}°C` },
    { label: 'Pressure', value: `${pressure} mmHg` },
    { label: 'Humidity', value: `${humidity}%` },
  ];

  return (
    <article className={styles.currentWeatherContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.icon}>{formatIcon(icon)}</div>
        <div>
          <h2 className={styles.heading}>Today</h2>
          <p className={styles.time}>
            {formattedTime}
            <small className={styles.updated}>
              (updated: {formattedTime.slice(0, 2)}:00)
            </small>
          </p>
        </div>
      </div>
      <div className={styles.rightContainer}>
        {weatherInfo?.map(({ label, value }) => (
          <p key={label} className={styles.singleRow}>
            <span className={styles.label}>{label}:</span> {value}
          </p>
        ))}
      </div>
    </article>
  );
};

export default CurrentWeather;
