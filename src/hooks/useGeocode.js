import { useEffect, useState } from 'react';

const useGeocode = (initialUrl) => {
  const [url, setUrl] = useState(initialUrl);
  const [locationName, setLocationName] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setLocationName(data[0].name);

        return data;
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { locationName, error, loading, setUrl };
};

export default useGeocode;
