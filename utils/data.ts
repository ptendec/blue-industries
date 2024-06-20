export interface Data {
  date: string;
  Cut: number;
  Temp: number;
  Pol: number;
  CNC: number;
  IG: number;
  Lami: number;
  Span: number;
  Creating: number;
  Loading: number;
}

export interface TransformedData {
  date: string;
  data: { name: string; score: number }[];
}

export function transformData(input: Data[]): TransformedData[] {
  return input.map((item) => {
    const { date, ...scores } = item;
    const data = Object.entries(scores).map(([name, score]) => ({
      name,
      score,
    }));
    return { date, data };
  });
}

export function revertData(transformed: TransformedData[]): Data[] {
  return transformed.map((item) => {
    const scores = item.data.reduce((acc, { name, score }) => {
      acc[name] = score;
      return acc;
    }, {} as { [key: string]: number });

    const result: { date: string; [key: string]: number | string } = {
      date: item.date,
    };

    Object.keys(scores).forEach((key) => {
      if (scores[key] !== undefined) {
        result[key] = scores[key];
      }
    });

    return result as unknown as Data;
  });
}

export const sortData = (
  data: TransformedData[],
  sort: string
): TransformedData[] => {
  const averageScores = calculateAverageScores(data);

  return data.map((row) => ({
    ...row,
    data: row.data.sort((a, b) => {
      if (sort === "Ascending") {
        // @ts-expect-error
        return averageScores[a.name] - averageScores[b.name];
      } else if (sort === "Descending") {
        // @ts-expect-error
        return averageScores[b.name] - averageScores[a.name];
      }
      return 0;
    }),
  }));
};

export const filterData = (
  data: TransformedData[],
  employees: { [key: string]: boolean }
): TransformedData[] => {
  return data.map((row) => ({
    ...row,
    data: row.data.filter((entry) => employees[entry.name]),
  }));
};

export const processData = (
  initialData: Data[] | undefined = [],
  sort: "Ascending" | "Descending" | "None",
  employees: { [key: string]: boolean },
  filterBy: "Best" | "Average" | "Low" | "None"
): TransformedData[] => {
  const transformedData = transformData(initialData);
  const averageScores = calculateAverageScores(transformedData);
  const sortedData = sortData(transformedData, sort);
  // @ts-expect-error
  const filteredData = filterByScore(sortedData, filterBy, averageScores);

  return filteredData.map((row) => ({
    ...row,
    data: row.data.filter((entry) => employees[entry.name]),
  }));
};

function calculateAverageScores(data: TransformedData[]): {
  [key: string]: number | string;
} {
  const scoreMap: { [name: string]: { totalScore: number; count: number } } =
    {};

  data.forEach((entry) => {
    entry.data.forEach((record) => {
      let score = 0;
      if (typeof record.score === "string") {
        // @ts-expect-error
        score = record.score.trim() === "" ? 0 : parseFloat(record.score);
      } else {
        score = record.score;
      }
      if (!scoreMap[record.name]) {
        scoreMap[record.name] = { totalScore: 0, count: 0 };
      }
      scoreMap[record.name].totalScore += score;
      scoreMap[record.name].count += 1;
    });
  });

  const averageScores: { [key: string]: number } = {};
  Object.keys(scoreMap).forEach((name) => {
    averageScores[name] = scoreMap[name].totalScore / scoreMap[name].count;
  });

  return averageScores;
}

function filterByScore(
  data: TransformedData[],
  filterBy: "Best" | "Average" | "Low" | "None",
  averageScores: { [key: string]: number }
): TransformedData[] {
  const filteredTeams: { [key: string]: boolean } = {};

  for (const team in averageScores) {
    const avg = averageScores[team];
    if (
      (filterBy === "Best" && avg > 2 && avg <= 3) ||
      (filterBy === "Average" && avg > 1 && avg <= 2) ||
      (filterBy === "Low" && avg === 1) ||
      filterBy === "None"
    ) {
      filteredTeams[team] = true;
    }
  }

  return data.map((row) => ({
    ...row,
    data: row.data.filter((entry) => filteredTeams[entry.name]),
  }));
}

export function splitArray<T>(arr: T[]): [T[], T[]] {
  if (arr.length === 0) {
    return [[], []];
  }

  const allButLast = arr.slice(0, -1);
  const lastElement = arr.slice(-1);

  return [allButLast, lastElement];
}
