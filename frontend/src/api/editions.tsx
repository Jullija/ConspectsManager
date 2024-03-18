import { Edition } from "../utils/types";

export const getEditions = (subjectId: number):Edition[] => {
  return [
    { name: "edition 1", year: 2023, subjectId: 1, id: 1 },
    { name: "edition 2", year: 2023, subjectId: 1, id: 2 },
    { name: "edition 3", year: 2023, subjectId: 1, id: 3 },
    { name: "edition 4", year: 2023, subjectId: 1, id: 4 },
    { name: "edition 5", year: 2023, subjectId: 1, id: 5 },
    { name: "edition 6", year: 2023, subjectId: 1, id: 6 },
  ];
};
