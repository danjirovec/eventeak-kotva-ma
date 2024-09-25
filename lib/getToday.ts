export const getToday = () => {
  return new Date(new Date().setHours(0, 0, 0, 0));
};
