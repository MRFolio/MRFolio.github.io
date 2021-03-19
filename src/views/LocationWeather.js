import { WeatherHeader, WeatherInfo } from '../components';

const LocationWeather = () => {
  return (
    <>
      <WeatherHeader />
      <main className="main">
        <WeatherInfo />
      </main>
    </>
  );
};

export default LocationWeather;
