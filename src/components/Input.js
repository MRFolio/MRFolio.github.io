import { useState } from 'react';
import { useHistory } from 'react-router';
import { useWeatherContext } from '../store/WeatherContext';
import styles from './Input.module.scss';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const Input = () => {
  const history = useHistory();
  const { loading, error, setError } = useWeatherContext();
  const [userInput, setUserInput] = useState('');
  const [geoLocationStatus, setGeoLocationStatus] = useState('');
  const [currentLocationCoordinates, setCurrentLocationCoordinates] = useState(
    {}
  );

  // Local Storage
  // useEffect(() => {
  //   const value = cu;
  //   localStorage.setItem('location', value);
  // }, [currentWeather]);

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
  // Local Storage
  const addQueryToLocalStorage = () => {
    let queryList = localStorage.getItem('location');
    if (queryList.length === 5) {
      queryList.shift();
      queryList.push(userInput);
    } else {
      queryList.push(userInput);
    }
    localStorage.setItem('location', JSON.stringify(queryList));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.getItem('location')
      ? addQueryToLocalStorage()
      : localStorage.setItem('location', []);

    history.push(`/location/${userInput}`);
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      return data;
    } catch (error) {}
  };

  const handleClick = async () => {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setGeoLocationStatus('');
    };

    const error = () => {
      setGeoLocationStatus('Unable to retrieve your location');
    };

    if (!navigator.geolocation) {
      setGeoLocationStatus('Geolocation is not supported by your browser.');
    } else {
      setGeoLocationStatus('Locating…');
      navigator.geolocation.getCurrentPosition(success, error);
    }

    setCurrentLocationCoordinates({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
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
