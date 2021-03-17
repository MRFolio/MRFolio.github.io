import {
  IoCloud,
  IoPartlySunny,
  IoRainy,
  IoSnow,
  IoThunderstorm,
} from 'react-icons/io5';
import { RiMistFill, RiSunFill } from 'react-icons/ri';
import { unixToWeekDay } from '../utils';
import styles from './WeatherCard.module.scss';

const DailyForecastCard = ({ index, icon, temp, time, wind_speed }) => {
  const weekDay = index === 0 ? 'Tomorrow' : unixToWeekDay(time);

  const formatIcon = (initialIcon) => {
    let renderIcon;
    switch (initialIcon) {
      case '01':
        renderIcon = <RiSunFill />;
        break;
      case '02':
        renderIcon = <IoPartlySunny />;
        break;
      case '03':
        renderIcon = <IoCloud />;
        break;
      case '04':
        renderIcon = <IoCloud />;
        break;
      case '05':
        renderIcon = <IoRainy />;
        break;
      case '10':
        renderIcon = <IoRainy />;
        break;
      case '11':
        renderIcon = <IoThunderstorm />;
        break;
      case '13':
        renderIcon = <IoSnow />;
        break;
      case '50':
        renderIcon = <RiMistFill />;
        break;
      default:
        renderIcon = <RiSunFill />;
    }

    return renderIcon;
  };

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
