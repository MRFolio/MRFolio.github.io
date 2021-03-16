import { useWeatherContext } from '../store/WeatherContext';
import { Spinner } from './index';

const LocationWeather = () => {
  const { loading, error, locationWeather } = useWeatherContext();

  if (loading) return <Spinner />;

  if (error || !locationWeather) {
    return <p>Cannot display weather. Reason: {error}.</p>;
  }

  return <section>Weather information</section>;
};

export default LocationWeather;
