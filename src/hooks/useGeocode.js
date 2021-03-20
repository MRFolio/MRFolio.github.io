import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useWeatherContext } from '../store/WeatherContext';

const API_ENDPOINT = 'https://api.openweathermap.org/geo/1.0/direct?q=';

const useGeocode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const { addLocationToRecentlyViewedList } = useWeatherContext();

  const geocode = useCallback(
    async (locationName) => {
      const geoUrl = `${API_ENDPOINT}${locationName}&limit=1&appid=${process.env.REACT_APP_API_KEY}`;
      setError(undefined);
      setLoading(true);

      try {
        const response = await fetch(geoUrl);
        const data = await response.json();

        if (!response.ok || data.length === 0) {
          throw new Error("Can't find such location");
        }

        if (data) {
          addLocationToRecentlyViewedList(locationName);
          const { lat, lon } = data[0];
          history.push(`/location/${lat}_${lon}`);
        }

        return data;
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [addLocationToRecentlyViewedList, history]
  );

  return { error, loading, geocode };
};

export default useGeocode;
