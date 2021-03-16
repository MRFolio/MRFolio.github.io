import { useState } from 'react';
import { useHistory } from 'react-router';
import { useWeatherContext } from '../store/WeatherContext';
import styles from './Input.module.scss';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const Input = () => {
  const history = useHistory();
  const { loading, error, setCurrentLocation } = useWeatherContext();
  const [userInput, setUserInput] = useState('');
  // useEffect(() => {
  //   const fetchCurrentCityWeather = async (city) => {
  //     const url = `${API_BASE_URL}?&q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
  //     setLoading(true);

  //     try {
  //       const response = await fetch(url);
  //       const data = await response.json();
  //       if (data) {
  //       } else {
  //         setError('Something went wrong. Nothing to show.');
  //       }
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCurrentCityWeather('tartu');
  // }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/location/tartu');
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  };

  // if (loading) return <Spinner />;

  // if (error) {
  //   return <p>Cannot display weather...</p>;
  // }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userInput"
          id="userInput"
          placeholder="Enter location"
          value={userInput}
          onChange={handleChange}
        />
      </form>
      <button
        className={styles.locationBtn}
        type="button"
        onClick={handleClick}
      >
        <span className={styles.locationBtnText}>
          Select my current location
        </span>
      </button>
    </>
  );
};

export default Input;
