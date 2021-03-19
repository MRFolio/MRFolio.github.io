import { useCallback, useEffect, useState } from 'react';

const API_ENDPOINT = 'http://api.openweathermap.org/geo/1.0/direct?q=';

const useGeocode = (location) => {
  const [coordinates, setCoordinates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const geocode = useCallback(async (location) => {
    const geoUrl = `${API_ENDPOINT}${location}&limit=1&appid=${process.env.REACT_APP_API_KEY}`;
    setError(undefined);
    setLoading(true);

    try {
      const response = await fetch(geoUrl);
      const data = await response.json();

      if (!response.ok || data.length === 0) {
        throw new Error("Can't find such location");
      }

      if (data) {
        const { lat, lon } = data[0];
        setCoordinates({ lat, lon });
      }

      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    geocode(location);
  }, [geocode, location]);

  return { error, loading, coordinates };
};

export default useGeocode;
