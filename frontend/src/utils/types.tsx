export type Subject = {
  name: string;
  id: number;
  description: string;
};

export type Edition = {
  name: string;
  year: number;
  subjectId: number;
  id: number;
};
