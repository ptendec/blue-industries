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
  const pastDate = new Date(
    Date.UTC(
      currentDate.getFullYear(),
      0, // Январь (месяц начинается с 0)
      1 // Первый день месяца
    )
  );
  const pastDate2 = new Date(currentDate);

  const toDate = pastDate2.toISOString().split("T")[0];
  const fromDate = pastDate.toISOString().split("T")[0];
  const { data, isLoading } = useQuery({
    queryKey: ["year", fromDate, toDate],
    queryFn: () => fetchMonthly(fromDate, toDate),
  });

  const { employees, sort, filterBy, setDataForExport } =
    useEmployeeVisibilityStore();

  const [processedData, setProcessedData] = useState<TransformedData[]>([]);

  useEffect(() => {
    const processed = processData(data, sort, employees, filterBy);
    setDataForExport(processed);

    setProcessedData(processed);
  }, [data, sort, employees, filterBy]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.th}></th>
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
            <td
              className={styles.td}
              style={{
                minWidth: "150px",
              }}
            >
              <div className={styles.flex}>{entry.name}</div>
            </td>
            {processedData.map((row) => {
              const dataItem = row.data.find((d) => d.name === entry.name);
              return (
                <td className={styles.td} key={`${row.month}-${entry.name}`}>
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
