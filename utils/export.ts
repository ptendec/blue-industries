import { formatDate, formatDateRange, formatYearMonth } from "./date";

interface TransformedData {
  date?: string;
  from?: string;
  to?: string;
  month?: string;
  data: { name: string; score: number }[];
}

function unifyDateFormat(
  data: TransformedData[]
): { date: string; data: { name: string; score: number }[] }[] {
  return data.map((item) => {
    let date = "";
    if (item.date) {
      date = formatDate(item.date);
    } else if (item.from && item.to) {
      date = formatDateRange(item.from, item.to);
    } else if (item.month) {
      date = formatYearMonth(item.month);
    }
    return {
      date,
      data: item.data,
    };
  });
}

export function createScoreMatrix(
  data: { date: string; data: { name: string; score: number }[] }[]
): string[][] {
  const matrix: string[][] = [];
  const header = ["Date", ...data[0].data.map((d) => d.name)];
  matrix.push(header);

  data.forEach((item) => {
    const row = [item.date];
    item.data.forEach((d) => {
      row.push(d.score.toString());
    });
    matrix.push(row);
  });

  return matrix;
}
