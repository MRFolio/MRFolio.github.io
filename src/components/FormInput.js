import { memo, useEffect, useRef, useState } from 'react';
import { HiLocationMarker, HiOutlineLocationMarker } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import { ErrorMessage, Spinner } from '../components';
import { useWeatherContext } from '../store/WeatherContext';
import { citiesList } from '../utils';
import styles from './FormInput.module.scss';

const API_ENDPOINT = 'http://api.openweathermap.org/geo/1.0/direct?q=';

const FormInput = memo(({ locationName }) => {
  const [userInput, setUserInput] = useState(locationName || '');
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const { addLocationToRecentlyViewedList } = useWeatherContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setUserInput('');
    }
  };

  // click outside effect
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const input = e.target.value;
    // const filteredSuggestions = citiesList
    //   .filter(
    //     (city) => city.toLowerCase().indexOf(input.trim().toLowerCase()) > -1
    //   )
    //   .slice(0, 3);
    const filteredSuggestions = citiesList
      .filter((city) =>
        city.toLowerCase().startsWith(input.trim().toLowerCase())
      )
      .slice(0, 3);
    const inputLettersAdded = [...filteredSuggestions, input + '....'];

    setFilteredSuggestions(inputLettersAdded);
    setActiveSuggestion(0);
    setUserInput(input);
  };

  const geocode = async (location) => {
    const geoUrl = `${API_ENDPOINT}${location}&limit=1&appid=${process.env.REACT_APP_API_KEY}`;
    setError(undefined);
    setLoading(true);

    try {
      const response = await fetch(geoUrl);
      const data = await response.json();

      if (!response.ok || data.length === 0) {
        throw new Error("Can't find such location");
      }

      if (data && location.length > 2) {
        addLocationToRecentlyViewedList(location);
        const { lat, lon } = data[0];
        history.push(`/location/${location}_${lat}_${lon}`);
      }

      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.keyCode === 13) {
      // enter
      const currentSuggestion = filteredSuggestions[activeSuggestion];
      setActiveSuggestion(0);

      if (filteredSuggestions.length > 1) {
        setUserInput(currentSuggestion);
        await geocode(currentSuggestion);
      }

      await geocode(userInput);
    } else if (e.keyCode === 38) {
      // up arrow
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) {
      // down arrow
      if (filteredSuggestions.length - 2 === activeSuggestion) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const handleSuggestionClick = async (e, index) => {
    if (index !== filteredSuggestions.length - 1) {
      setActiveSuggestion(0);
      setFilteredSuggestions([]);
      setUserInput(e.currentTarget.textContent);
      await geocode(e.currentTarget.textContent);
    }
  };

  const handleClearClick = () => {
    setUserInput('');
    history.push('/');
  };

  return (
    <form
      ref={wrapperRef}
      onSubmit={handleSubmit}
      className={styles.form}
      autoComplete="off"
    >
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          name="userInput"
          id="userInput"
          placeholder="Enter location"
          value={userInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {userInput ? (
          <HiLocationMarker className={`${styles.icon} ${styles.active}`} />
        ) : (
          <HiOutlineLocationMarker className={styles.icon} />
        )}
        {userInput && (
          <button
            type="button"
            aria-label="Clear input and navigate to homepage"
            title="Clear input and navigate to homepage"
            className={styles.clearBtn}
            onClick={handleClearClick}
          >
            Clear
          </button>
        )}
      </div>
      {userInput && filteredSuggestions.length > 1 && (
        <div className={styles.suggestionsContainer}>
          <ul className={styles.suggestionsList}>
            {filteredSuggestions?.map((suggestion, index) => (
              <li
                className={`${styles.suggestion} ${
                  index === activeSuggestion && styles.active
                }`}
                key={suggestion}
                onClick={(e) => handleSuggestionClick(e, index)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}
    </form>
  );
});

export default FormInput;
