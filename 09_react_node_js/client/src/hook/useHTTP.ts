import {useCallback, useState} from 'react';

const useHTTP = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const request = useCallback(
    async (url: string, method = 'GET', body = null, headers = {}) => {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }
      setLoading(true);
      try {
        const response = await fetch(url, {method, body, headers});
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Errors');
        }
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setErrors((error as Error).message);
        throw error;
      }
    },
    [],
  );

  const clearError = useCallback(() => setErrors(''), []);

  return {loading, errors, request, clearError};
};

export default useHTTP;
