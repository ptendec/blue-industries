export function formatDate(paramDate: string): string {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(paramDate);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${day} ${month} ${year} (${dayOfWeek}.)`;
}

export const isWorkingDay = (date: string) => {
  const day = new Date(date).getDay();
  return day !== 0 && day !== 6;
};
