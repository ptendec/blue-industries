import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchMonthly } from "../../../api/services";
import { useEmployeeVisibilityStore } from "../../../store";
import { valueToEmoji } from "../../../utils/common";
import { formatYearMonth } from "../../../utils/date";
import { TransformedData, processData } from "../../../utils/year";
import styles from "./style.module.css";

interface Scores {
  name: string;
  score: number;
}

export const Year: React.FC = () => {
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  const pastDate2 = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - 365);
  const toDate = pastDate2.toISOString().split("T")[0];
  const fromDate = pastDate.toISOString().split("T")[0];
  const { data, isLoading } = useQuery({
    queryKey: ["year", fromDate, toDate],
    queryFn: () => fetchMonthly(fromDate, toDate),
  });

  const { employees, sort, filterBy } = useEmployeeVisibilityStore();

  const [processedData, setProcessedData] = useState<TransformedData[]>([]);

  useEffect(() => {
    const processed = processData(data, sort, employees, filterBy);

    setProcessedData(processed);
  }, [data, sort, employees, filterBy]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th></th>
          {processedData.map((row) => (
            <th className={styles.th} key={row.month}>
              {formatYearMonth(row.month)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {processedData[0]?.data.map((entry) => (
          <tr key={entry.name}>
            <td className={styles.td}>
              <div className={styles.flex}>{entry.name}</div>
            </td>
            {processedData.map((row) => {
              const dataItem = row.data.find((d) => d.name === entry.name);
              return (
                <td className={styles.td} key={`${row.month}-${entry.name}`}>
                  {dataItem ? valueToEmoji(dataItem.score) : null}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
