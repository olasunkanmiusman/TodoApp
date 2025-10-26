export const formatDateTime = (value: string | number | Date): string => {
  if (!value) return "";

  let date: Date;
  if (value instanceof Date) {
    date = value;
  } else if (typeof value === "string" && /^\d+$/.test(value)) { 
    date = new Date(Number(value));
  } else {
    date = new Date(value);
  }

  if (isNaN(date.getTime())) return ""; // invalid date guard

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const hours = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const getOrdinal = (n: number) => {
    if (n >= 11 && n <= 13) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${month} ${day}${getOrdinal(day)}, ${hours.toLowerCase()}`;
};
