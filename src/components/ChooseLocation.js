import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormInput, RecentLocation, Spinner } from '../components';
import styles from './ChooseLocation.module.scss';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getLocalStorage = () =>
  localStorage.getItem('recentlyViewed')
    ? JSON.parse(localStorage.getItem('recentlyViewed'))
    : [];

const ChooseLocation = () => {
  const history = useHistory();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState(getLocalStorage());

  // const {
  //   loading,
  //   error,
  //   setError,
  //   setLoading,
  //   setCurrentLocation,
  //   locationWeather,
  // } = useWeatherContext();
  // const [userInput, setUserInput] = useState('');
  // const [activeSuggestion, setActiveSuggestion] = useState(0);
  // const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  // const [showSuggestions, setShowSuggestions] = useState(false);
  const [geoLocationStatus, setGeoLocationStatus] = useState('');

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);
  // const [locationName, setLocationName] = useState('');

  // const { setUrl, locationName, loading, error } = useGeocode('');

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
  // const addQueryToStorage = () => {
  //   let queryList = JSON.parse(localStorage.getItem('recentlyViewed'));

  //   const addToStorage = () => {
  //     queryList.push(userInput);
  //   };

  //   const removeAndAddToStorage = () => {
  //     queryList.shift();
  //     addToStorage();
  //   };

  //   queryList.length === 5 ? removeAndAddToStorage() : addToStorage();
  //   localStorage.setItem('recentlyViewed', JSON.stringify(queryList));
  // };

  // const addtoEmptyStorage = () => {
  //   let queriesList = [];
  //   queriesList.push(userInput);
  //   localStorage.setItem('recentlyViewed', JSON.stringify(queriesList));
  // };

  const reverseGeocode = async (latitude, longitude) => {
    const reverseGeoUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.REACT_APP_API_KEY}`;
    setLoading(true);
    setError(undefined);

    try {
      const response = await fetch(reverseGeoUrl);
      const data = await response.json();
      // setLocationName(data[0].name);
      return data[0].name;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const geocode = async (city) => {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_API_KEY}`;
    setLoading(true);

    try {
      const response = await fetch(geoUrl);
      const data = await response.json();
      // setLocation(data[0].name);
      // setUserInput(data[0].name);

      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    const success = async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      // const reverseGeoUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.REACT_APP_API_KEY}`;
      // setUrl(reverseGeoUrl);
      // console.log(locationName);
      const locationName = await reverseGeocode(lat, lon);
      // setCurrentLocation({ lat, lon });
      history.push('/tere');
      // if (locationName) {
      //   history.push({
      //     pathname: `/location/${locationName}_${lat}_${lon}`,
      //     // pathname: `/location/${lat}_${lon}`,
      //     // state: { locationName },
      //   });
      // }
      // console.log(locationName);
      // history.push(`/location/${locationName}`);
    };

    const error = () => {
      setError('Unable to retrieve your location');
    };

    !navigator.geolocation
      ? setError('Geolocation is not supported by your browser.')
      : navigator.geolocation.getCurrentPosition(success, error);

    // setCurrentLocationCoordinates({
    //   lat: position.coords.latitude,
    //   long: position.coords.longitude,
    // });
  };

  if (loading) return <Spinner />;

  if (error) {
    return <p>Cannot display weather...</p>;
  }

  return (
    <>
      <section className={styles.locationContainer}>
        <FormInput />
        <button
          className={styles.locationBtn}
          type="button"
          onClick={handleClick}
        >
          <span className={styles.locationBtnText}>
            Select my current location
          </span>
        </button>
      </section>
      {error && <p className={styles.geoLocationStatus}>{error}</p>}
      {recentlyViewed && (
        <section className={styles.recentlyContainer}>
          <h2 className={styles.headingRecent}>Recently viewed</h2>
          {recentlyViewed
            .slice(0)
            .reverse()
            .map((location) => (
              <RecentLocation key={location} location={location} />
            ))}
        </section>
      )}
    </>
  );
};

export default ChooseLocation;
