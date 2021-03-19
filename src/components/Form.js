import { useEffect, useRef, useState } from 'react';
import { HiLocationMarker, HiOutlineLocationMarker } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import { ErrorMessage, Spinner } from '../components';
import useGeocode from '../hooks/useGeocode';
import { citiesList } from '../utils';
import styles from './Form.module.scss';

const Form = ({ locationName }) => {
  const [userInput, setUserInput] = useState(locationName || '');
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { error, loading, geocode } = useGeocode();
  const history = useHistory();
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setUserInput('');
    }
  };

  // click outside form to close suggestions box
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

    const filteredSuggestions = citiesList
      .filter((city) =>
        city.toLowerCase().startsWith(input.trim().toLowerCase())
      )
      .slice(0, 3);
    const inputLettersAdded = [...filteredSuggestions, input + '....'];

    setFilteredSuggestions(inputLettersAdded);
    setShowSuggestions(true);
    setActiveSuggestion(0);
    setUserInput(input);
  };

  const handleKeyDown = async (e) => {
    switch (e.keyCode) {
      case 13: // enter
        const currentSuggestion = filteredSuggestions[activeSuggestion];
        setActiveSuggestion(0);
        setShowSuggestions(false);

        if (filteredSuggestions.length > 1) {
          setUserInput(currentSuggestion);
          await geocode(currentSuggestion);
        } else {
          await geocode(userInput);
        }
        break;
      case 38: // up arrow
        if (activeSuggestion === 0) {
          return;
        }
        setActiveSuggestion(activeSuggestion - 1);
        break;
      case 40: // down arrow
        if (filteredSuggestions.length - 2 === activeSuggestion) {
          return;
        }
        setActiveSuggestion(activeSuggestion + 1);
        break;
      default:
        break;
    }
  };

  const handleSuggestionClick = async (e, index) => {
    if (index !== filteredSuggestions.length - 1) {
      setActiveSuggestion(0);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
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
      {userInput && showSuggestions && filteredSuggestions.length > 1 && (
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
};

export default Form;
