const generateYearOptions = (startYear: number, endYear: number) => {
  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push({ key: year, value: year, text: year });
  }
  return years;
};

export const yearOptions = generateYearOptions(1920, 2024);
