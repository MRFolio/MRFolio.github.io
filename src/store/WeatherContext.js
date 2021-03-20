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
  const [recentlyViewed, setRecentlyViewed] = useState(getLocalStorage());

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addLocationToRecentlyViewedList = useCallback((locationName) => {
    // Add to beginning of array
    setRecentlyViewed((prevRecentlyViewed) => [
      locationName,
      ...prevRecentlyViewed,
    ]);
  }, []);

  return (
    <WeatherContext.Provider
      value={{
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
