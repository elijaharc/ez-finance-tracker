export const getFormattedDates = (dateToFormat: Date) => {
  const month = dateToFormat.toLocaleString("default", { month: "long" });
  const monthNum = dateToFormat.getMonth() + 1;
  const day = dateToFormat.getDate().toString();
  const year = dateToFormat.getFullYear().toString();
  const date = `${year}-${monthNum < 10 ? `0${monthNum}` : monthNum}-${day}`;
  return { month, day, date };
};
