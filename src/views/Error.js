import { useHistory } from 'react-router';

const Error = () => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <>
      <p>Nothing to see here.</p>
      <button style={{ cursor: 'pointer' }} onClick={handleBack}>
        Go Back
      </button>
    </>
  );
};

export default Error;
