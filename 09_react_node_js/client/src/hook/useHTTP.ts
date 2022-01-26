import {useCallback, useState} from 'react';

interface BodyType {
  username: string;
  password: string;
}

interface ResDataType {
  accessToken: string;
  user: {
    id: string;
    roles: string[];
    username: string;
  };
}

interface HeadersType {
  'Content-Type': string;
}

interface Type {
  errors: string;
  request: (
    url: string,
    method?: string,
    body?: BodyType,
    headers?: HeadersType,
  ) => Promise<ResDataType>;
}

const useHTTP = (): Type => {
  const [errors, setErrors] = useState('');

  const request = useCallback(
    async (url: string, method = 'GET', body = null, headers = {}) => {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      try {
        const response = await fetch(url, {method, body, headers});
        const data = await response.json();

        if (!response.ok) {
          if (data.errors[0]) {
            throw new Error(data.errors[0].msg || 'Errors');
          }
          throw new Error(data.message || 'Errors');
        }

        return data;
      } catch (error) {
        setErrors((error as Error).message);
        throw error;
      }
    },
    [],
  );

  return {errors, request};
};

export default useHTTP;
