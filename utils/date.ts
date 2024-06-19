export function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "short",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    new Date(date)
  );

  return formattedDate.replace(",", "");
}
