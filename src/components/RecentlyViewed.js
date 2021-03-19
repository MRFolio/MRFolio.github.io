import { RecentLocation } from '../components';
import { useWeatherContext } from '../store/WeatherContext';
import styles from './RecentlyViewed.module.scss';

const RecentlyViewed = () => {
  const { recentlyViewed } = useWeatherContext();

  return (
    Boolean(recentlyViewed.length) && (
      <section className={styles.recentlyContainer}>
        <h2 className={styles.headingRecent}>Recently viewed</h2>
        <ul>
          {recentlyViewed
            .slice(0)
            .reverse()
            .slice(0, 5)
            .map((location, i) => (
              <RecentLocation key={i} location={location} />
            ))}
        </ul>
      </section>
    )
  );
};

export default RecentlyViewed;
