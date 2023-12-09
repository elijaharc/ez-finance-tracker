export const getFormattedDates = (dateToFormat: Date) => {
  const date = dateToFormat.toISOString().split("T")[0];
  const month = dateToFormat.toLocaleString("default", { month: "long" });
  const day = dateToFormat.getDate().toString();

  return { month, day, date };
};
