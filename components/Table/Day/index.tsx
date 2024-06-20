import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchDaily, updateDate } from "../../../api/services";
import { useEmployeeVisibilityStore } from "../../../store";
import { valueToEmoji } from "../../../utils/common";
import { processData, revertData } from "../../../utils/data";
import { formatDate, isWorkingDay } from "../../../utils/date";
import Select from "../../Common/DaySelect";
import { SmileBad } from "../../SvgIcons/smile-bad";
import { SmileGood } from "../../SvgIcons/smile-good";
import { SmileMedium } from "../../SvgIcons/smile-medium";
import styles from "./style.module.css";

interface Scores {
  name: string;
  score: number;
}

export const Day: React.FC = () => {
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  const pastDate2 = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - 8);
  pastDate2.setDate(currentDate.getDate() - 1);
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

  const [processedData, setProcessedData] = useState(
    processData(data, sort, employees, filterBy)
  );

  const [scores, setScores] = useState<Scores[]>([]);

  useEffect(() => {
    setProcessedData(processData(data, sort, employees, filterBy));
  }, [data, sort, employees, filterBy]);

  useEffect(() => {
    const row = processedData.find((row) => row.date === toDate);
    setScores(row?.data ?? []);
  }, [processedData, toDate]);

  const handleUpdate = async (value: number, name: string) => {
    const row = processedData.find((row) => row.date === toDate);
    if (!row) return;
    const formed = row.data.map((entry) => {
      if (entry.name === name) {
        return { name, score: value };
      }
      return {
        name: entry.name,
        score: Number(entry.score),
      };
    });
    const updateData = revertData([
      { date: new Date(row.date).toISOString().split("T")[0], data: formed },
    ]);
    await mutateAsync(updateData);
    refetch();
  };

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
          <th>{formatDate(new Date().toISOString())}</th>
        </tr>
      </thead>
      <tbody>
        {processedData[0]?.data.map((entry) => (
          <tr key={entry.name}>
            <td className={styles.td}>
              <div className={styles.flex}>
                {/* <input
                  type="checkbox"
                  checked={checkedTeams[entry.name] || false}
                  onChange={() => handleCheckboxChange(entry.name)}
                /> */}
                {entry.name}
              </div>
            </td>
            {processedData.map((row) => {
              const dataItem = row.data.find((d) => d.name === entry.name);
              return (
                <td className={styles.td} key={`${row.date}-${entry.name}`}>
                  {dataItem ? valueToEmoji(dataItem.score) : null}
                </td>
              );
            })}
            <td className={styles.td}>
              {isWorkingDay(new Date().toISOString().split("T")[0]) && (
                <Select
                  value={Number(
                    scores.find((score) => score.name === entry.name)?.score
                  )}
                  onChange={(element) => {
                    handleUpdate(element.value, entry.name);
                  }}
                  options={[
                    { value: 1, label: <SmileBad /> },
                    { value: 2, label: <SmileMedium /> },
                    { value: 3, label: <SmileGood /> },
                  ]}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
