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

export function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const startMonth = startDate.toLocaleString("en", { month: "short" });
  const endMonth = endDate.toLocaleString("en", { month: "short" });
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return `${startDay}-${endDay} ${startMonth} ${startYear}`;
    } else {
      return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYear}`;
    }
  } else {
    return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
  }
}

export function formatYearMonth(dateString: string): string {
  const date = new Date(dateString + "-01"); // Adding day to create a valid Date object
  const month = date.toLocaleString("en", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${year}`;
}
