import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchDaily, updateDate } from "../../../api/services";
import { useEmployeeVisibilityStore } from "../../../store";
import { valueToEmoji } from "../../../utils/common";
import { TransformedData, processData } from "../../../utils/data";
import { formatDate } from "../../../utils/date";
import styles from "./style.module.css";

interface Scores {
  name: string;
  score: number;
}

export const Month: React.FC = () => {
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  const pastDate2 = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - 31);
  const toDate = pastDate2.toISOString().split("T")[0];
  const fromDate = pastDate.toISOString().split("T")[0];
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["daily", fromDate, toDate],
    queryFn: () => fetchDaily(fromDate, toDate),
  });
  const { mutateAsync } = useMutation({
    mutationFn: updateDate,
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
            <th className={styles.th} key={row.date}>
              {formatDate(row.date)}
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
                <td className={styles.td} key={`${row.date}-${entry.name}`}>
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
