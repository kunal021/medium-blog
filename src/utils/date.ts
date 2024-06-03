export function truncateData(data: string, wordLimit: number): string {
  const words = data.split(" ");
  if (words.length <= wordLimit) {
    return data;
  }

  return words.slice(0, wordLimit).join(" ") + "...";
}

export function getDate(timestamp: string) {
  const date = new Date(timestamp);

  // Extract year, month, and date
  const year = date.getUTCFullYear();
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
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();

  return `${day} ${month}, ${year}`;
}
