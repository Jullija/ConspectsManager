const generateYearOptions = (lowerBound: number, upperBound: number) => {
  const years = [];
  for (let year = upperBound; year >= lowerBound; year--) {
    years.push({ key: year, value: year, text: year });
  }
  return years;
};

export const yearOptions = generateYearOptions(1920, 2024);
