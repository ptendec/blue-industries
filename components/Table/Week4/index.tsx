import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchWeekly } from "../../../api/services";
import { useEmployeeVisibilityStore } from "../../../store";
import { valueToEmoji } from "../../../utils/common";
import { formatDateRange } from "../../../utils/date";
import { TransformedData, processData } from "../../../utils/week";
import styles from "./style.module.css";

interface Scores {
  name: string;
  score: number;
}

export const Week4: React.FC = () => {
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  const pastDate2 = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - 28);
  const toDate = pastDate2.toISOString().split("T")[0];
  const fromDate = pastDate.toISOString().split("T")[0];
  const { data, isLoading } = useQuery({
    queryKey: ["week4", fromDate, toDate],
    queryFn: () => fetchWeekly(fromDate, toDate),
  });

  const { employees, sort, filterBy, setDataForExport } =
    useEmployeeVisibilityStore();

  const [processedData, setProcessedData] = useState<TransformedData[]>([]);

  useEffect(() => {
    const processed = processData(data, sort, employees, filterBy);
    setProcessedData(processed);
    setDataForExport(processed);
  }, [data, sort, employees, filterBy]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th></th>
          {processedData.map((row) => (
            <th className={styles.th} key={row.from}>
              {formatDateRange(row.from, row.to)}
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
              console.log(dataItem);
              return (
                <td
                  className={styles.td}
                  key={`${row.from}-${row.to}-${entry.name}`}
                >
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