import { memo, useEffect, useRef, useState } from 'react';
import { HiLocationMarker, HiOutlineLocationMarker } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import { citiesList } from '../utils';
import styles from './FormInput.module.scss';

const FormInput = memo(({ recentlyViewed, setRecentlyViewed }) => {
  const [userInput, setUserInput] = useState('');
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
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

    if (userInput && userInput.length > 2) {
      setRecentlyViewed([...recentlyViewed, userInput]);
      // const newStorage = [...recentlyViewed, userInput];
      // localStorage.setItem('recentlyViewed', JSON.stringify(newStorage));
    }

    // history.push(`/location/${userInput}`);
  };

  const handleChange = (e) => {
    const input = e.target.value;

    const filteredSuggestions = citiesList
      .filter(
        (city) => city.toLowerCase().indexOf(input.trim().toLowerCase()) > -1
      )
      .slice(0, 3);
    const inputLettersAdded = [...filteredSuggestions, input + '....'];

    setFilteredSuggestions(inputLettersAdded);
    setActiveSuggestion(0);
    setUserInput(input);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setUserInput(filteredSuggestions[activeSuggestion]);
      setActiveSuggestion(0);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) {
      if (filteredSuggestions.length - 2 === activeSuggestion) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const handleSuggestionClick = (e) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setUserInput(e.currentTarget.textContent);
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
      {userInput && filteredSuggestions.length > 0 && (
        <div className={styles.suggestionsContainer}>
          <ul className={styles.suggestionsList}>
            {filteredSuggestions?.map((suggestion, index) => (
              <li
                className={`${styles.suggestion} ${
                  index === activeSuggestion && styles.active
                }`}
                key={suggestion}
                onClick={handleSuggestionClick}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
});

export default FormInput;
