import { useState } from 'react';
import { HiLocationMarker, HiOutlineLocationMarker } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import { citiesList } from '../utils';
import styles from './FormInput.module.scss';

const FormInput = () => {
  const [userInput, setUserInput] = useState('');
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // activeSuggestion: 0,
  // filteredSuggestions: [],
  // showSuggestions: false,
  // userInput:
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const recentlySearched = JSON.parse(localStorage.getItem('recentlyViewed'));

    localStorage.setItem('recentlyViewed', JSON.stringify(userInput));

    // ? addQueryToStorage()
    // : addtoEmptyStorage();

    history.push(`/location/${userInput}`);
  };

  const handleChange = (e) => {
    const input = e.target.value;
    console.log(input);

    const filteredSuggestions = citiesList.filter(
      (city) => city.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    console.log(filteredSuggestions);

    setFilteredSuggestions(filteredSuggestions);
    setActiveSuggestion(0);
    setShowSuggestions(true);
    setUserInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion]);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const handleSuggestionClick = (e) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.textContent);
  };

  const handleClearClick = () => {
    setUserInput('');
    history.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
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
          <HiLocationMarker className={styles.icon} />
        ) : (
          <HiOutlineLocationMarker
            className={`${styles.iconActive} ${styles.active}`}
          />
        )}
        {userInput && (
          <button
            type="button"
            aria-label="Clear input and go to homepage"
            className={styles.clearBtn}
            onClick={handleClearClick}
          >
            Clear
          </button>
        )}
      </div>

      {showSuggestions && userInput && filteredSuggestions.length > 0 && (
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
};

export default FormInput;
