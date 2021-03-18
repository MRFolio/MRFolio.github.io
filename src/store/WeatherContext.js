import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const WeatherContext = createContext(null);

const getLocalStorage = () =>
  localStorage.getItem('recentlyViewed')
    ? JSON.parse(localStorage.getItem('recentlyViewed'))
    : [];

const WeatherProvider = ({ children }) => {
  // const [currentLocation, setCurrentLocation] = useState({});
  // const [locationWeather, setLocationWeather] = useState({});
  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState(getLocalStorage());

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addLocationToRecentlyViewedList = useCallback((locationName) => {
    setRecentlyViewed((prevRecentlyViewed) => [
      ...prevRecentlyViewed,
      locationName,
    ]);
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        // locationWeather,
        // loading,
        // error,
        // setError,
        // setLoading,
        // setCurrentLocation,
        recentlyViewed,
        addLocationToRecentlyViewedList,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

// Custom hook
const useWeatherContext = () => useContext(WeatherContext);

export { useWeatherContext, WeatherProvider };
