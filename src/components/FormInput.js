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
    localStorage.setItem('recentlyViewed', JSON.stringify(userInput));

    // ? addQueryToStorage()
    // : addtoEmptyStorage();

    history.push(`/location/${userInput}`);
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);

    const filteredSuggestions = citiesList.filter(
      (city) => city.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setFilteredSuggestions(filteredSuggestions);
    setActiveSuggestion(0);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e) => {
    console.log(e);
  };

  const handleClearClick = () => {
    userInput('');
    history.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
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
      {showSuggestions ? (
        <HiLocationMarker className={styles.icon} />
      ) : (
        <HiOutlineLocationMarker className={styles.icon} />
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
      {showSuggestions &&
        userInput(
          <div className={styles.suggestionsContainer}>
            (
            <ul className={styles.suggestionsList}>
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  className={`${styles.suggestion} ${
                    index === activeSuggestion && styles.active
                  }`}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
            )
          </div>
        )}
    </form>
  );
};

export default FormInput;
