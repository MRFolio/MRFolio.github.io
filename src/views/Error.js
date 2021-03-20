import { useHistory } from 'react-router-dom';

const Error = () => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <section className="errorContainer">
      <h2 className="heading">
        Nothing to see <em>here</em> !
      </h2>
      <button
        type="button"
        aria-label="Navigate back to previous page"
        className="backBtn"
        onClick={handleBack}
      >
        {' '}
        Go Back
      </button>
    </section>
  );
};

export default Error;
