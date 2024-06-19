export interface Data {
  date: string;
  Cut: number;
  Temp: number;
  Pol: number;
  CNC: number;
  IG: number;
  Lami: number;
  Span: number;
  Crating: number;
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
  // @ts-expect-error
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

    return result;
  });
}

export const sortData = (
  data: TransformedData[],
  sort: string
): TransformedData[] => {
  if (sort === "Ascending") {
    return data.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  } else if (sort === "Descending") {
    return data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  return data; // If sort is "None" or any other value, return the data as is.
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
  const sortedData = sortData(transformedData, sort);

  // Calculate average scores
  const averageScores = calculateAverageScores(sortedData);

  // Filter based on average scores and visibility flags
  const filteredTeams = filterByScore(averageScores, filterBy);

  // Filter employees based on visibility
  const filteredData = sortedData.map((row) => ({
    ...row,
    data: row.data.filter(
      (entry) => employees[entry.name] && filteredTeams[entry.name]
    ),
  }));

  return filteredData;
};

export const calculateAverageScores = (
  data: TransformedData[]
): {
  [key: string]: number;
} => {
  const totalScores: { [key: string]: { sum: number; count: number } } = {};

  data.forEach((row) => {
    row.data.forEach(({ name, score }) => {
      if (!totalScores[name]) {
        totalScores[name] = { sum: 0, count: 0 };
      }
      totalScores[name].sum += score;
      totalScores[name].count += 1;
    });
  });

  const averageScores: { [key: string]: number } = {};
  for (const key in totalScores) {
    averageScores[key] = totalScores[key].sum / totalScores[key].count;
  }

  return averageScores;
};

function filterByScore(
  averageScores: { [key: string]: number },
  filterBy: "Best" | "Average" | "Low" | "None"
): { [key: string]: boolean } {
  const filteredTeams: { [key: string]: boolean } = {};

  for (const team in averageScores) {
    const avg = averageScores[team];
    if (
      (filterBy === "Best" && avg > 2 && avg <= 3) ||
      (filterBy === "Average" && avg > 1 && avg <= 2) ||
      (filterBy === "Low" && avg > 0 && avg <= 1) ||
      filterBy === "None"
    ) {
      filteredTeams[team] = true;
    }
  }

  return filteredTeams;
}
