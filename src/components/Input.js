import { useEffect } from 'react';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const Input = () => {
  useEffect(() => {
    const fetchCurrentCityWeather = async (city) => {
      const url = `${API_BASE_URL}?&q=${city}&appid=${process.env.REACT_APP_GOOGLE_KEY}&units=metric`;
      setLoading(true);

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
        } else {
          setError('Something went wrong. Nothing to show.');
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentCityWeather('tartu');
  }, [query]);
  return;
};

export default Input;
