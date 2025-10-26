import { DateType } from "react-native-ui-datepicker";

export const formatDateRange = (start?: DateType, end?: DateType) => {
  if (!start || !end) return "";

  const toDate = (value: DateType): Date => {
    if (value instanceof Date) return value;
    if (typeof value === "string" || typeof value === "number") return new Date(value);
    throw new Error("Invalid date value");
  };

  const startDate = toDate(start);
  const endDate = toDate(end);

  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const options: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" };

  const startDay = getOrdinal(startDate.getDate());
  const startMonthYear = startDate.toLocaleDateString("en-US", options);

  const endDay = getOrdinal(endDate.getDate());
  const endMonthYear = endDate.toLocaleDateString("en-US", options);

  return `${startDay} ${startMonthYear} - ${endDay} ${endMonthYear}`;
};