import { useEffect, useState } from 'react';
import { Subject } from '../utils/types';
import axios, { AxiosError } from 'axios';

const useCourses = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [courses, setCourses] = useState<Subject[]>([]);

  const fetchData = async () => {
    await axios
      .get('http://127.0.0.1:8000/courses')
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err: AxiosError) => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  });

  return { isLoading, error, courses };
};

export default useCourses;
