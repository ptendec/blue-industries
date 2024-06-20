import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchDaily } from "../../../api/services";
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
  const pastDate2 = new Date(
    Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    )
  );

  // Set pastDate to 31 days before the current date in UTC
  const pastDate = new Date(
    Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 31
    )
  );

  const toDate = pastDate2.toISOString().split("T")[0];
  const fromDate = pastDate.toISOString().split("T")[0];

  const { data, isLoading } = useQuery({
    queryKey: ["month", fromDate, toDate],
    queryFn: () => fetchDaily(fromDate, toDate),
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
          <th className={styles.th}></th>
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
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {dataItem ? valueToEmoji(dataItem.score) : null}
                  </div>{" "}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
