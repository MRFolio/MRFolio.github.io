import { useWeatherContext } from '../store/WeatherContext';
import { Spinner } from './index';

const LocationWeather = () => {
  const { loading, error } = useWeatherContext();

  if (loading) return <Spinner />;

  if (error) {
    return <p>Cannot display weather...</p>;
  }

  return <section>Weather information</section>;
};

export default LocationWeather;
