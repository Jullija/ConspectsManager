import { useState } from 'react';
import axios, { AxiosError } from 'axios';

const useAddEdition = (subjectId: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  const addEdition = async (name: string, year: number) => {
    await axios
      .post(`http://127.0.0.1:8000/courses/${subjectId}/editions/`, {
        name: name,
        year: year
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err: AxiosError) => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  return { isLoading, error, addEdition };
};

export default useAddEdition;
