import { useEffect, useState } from 'react';
import { Edition } from '../utils/types';
import axios, { AxiosError } from 'axios';

const useEditions = (subjectId: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [editions, setEditions] = useState<Edition[]>([]);

  const fetchData = async () => {
    axios
      .get(`http://127.0.0.1:8000/courses/${subjectId}/editions/`)
      .then((res) => {
        const editions: Edition[] = res.data.map((item: any) => {
          return { name: item.name, year: item.year, subjectId: item.course, id: item.id };
        });
        setEditions(editions);
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

  return { isLoading, error, editions };
};

export default useEditions;
