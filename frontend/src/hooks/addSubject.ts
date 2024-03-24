import { useState } from 'react';
import axios, { AxiosError } from 'axios';

const useAddSubject = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  const addSubject = async (name: string, description: string) => {
    await axios
      .post(`http://127.0.0.1:8000/courses/`, { name: name, description: description })
      .then((res) => {
        console.log(res);
      })
      .catch((err: AxiosError) => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  return { isLoading, error, addSubject };
};

export default useAddSubject;
