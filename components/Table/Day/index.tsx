import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchDaily, updateDate } from "../../../api/services";
import { useEmployeeVisibilityStore } from "../../../store";
import { valueToEmoji } from "../../../utils/common";
import { Data, processData, revertData } from "../../../utils/data";
import { formatDate, isWorkingDay } from "../../../utils/date";
import Select from "../../Common/DaySelect";
import { SmileBad } from "../../SvgIcons/smile-bad";
import { SmileGood } from "../../SvgIcons/smile-good";
import { SmileMedium } from "../../SvgIcons/smile-medium";
import styles from "./style.module.css";

const initialData: Data[] = [
  {
    date: "2024-06-13",
    Cut: 2,
    Temp: 1,
    Pol: 3,
    CNC: 3,
    IG: 1,
    Lami: 3,
    Span: 3,
    Crating: 3,
    Loading: 2,
  },
  {
    date: "2024-06-14",
    Cut: 2,
    Temp: 1,
    Pol: 3,
    CNC: 3,
    IG: 1,
    Lami: 3,
    Span: 3,
    Crating: 3,
    Loading: 2,
  },
  {
    date: "2024-06-15",
    Cut: 2,
    Temp: 1,
    Pol: 3,
    CNC: 3,
    IG: 1,
    Lami: 3,
    Span: 3,
    Crating: 3,
    Loading: 2,
  },
  {
    date: "2024-06-16",
    Cut: 2,
    Temp: 1,
    Pol: 3,
    CNC: 3,
    IG: 1,
    Lami: 3,
    Span: 3,
    Crating: 3,
    Loading: 2,
  },
  {
    date: "2024-06-17",
    Cut: 2,
    Temp: 1,
    Pol: 3,
    CNC: 3,
    IG: 1,
    Lami: 3,
    Span: 3,
    Crating: 3,
    Loading: 2,
  },
  {
    date: "2024-06-18",
    Cut: 2,
    Temp: 1,
    Pol: 3,
    CNC: 3,
    IG: 1,
    Lami: 3,
    Span: 3,
    Crating: 3,
    Loading: 2,
  },
];

interface Scores {
  name: string;
  score: number;
}

export const Day: React.FC = () => {
  const toDate = new Date().toISOString().split("T")[0];
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - 8);

  const fromDate = pastDate.toISOString().split("T")[0];
  console.log(currentDate);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["daily", fromDate, toDate],
    queryFn: () => fetchDaily(fromDate, toDate),
  });
  const { mutateAsync } = useMutation({
    mutationFn: updateDate,
  });

  const { employees, sort, filterBy } = useEmployeeVisibilityStore();
  const processedData = processData(data, sort, employees, filterBy);

  const [checkedTeams, setCheckedTeams] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [scores, setScores] = useState<Scores[]>([]);

  const handleSelectChange = (name: string, value: string) => {
    const foundScores = scores.find((score) => score.name === name);
    if (foundScores) {
      const newScores = scores.map((score) =>
        score.name === name ? { ...score, score: Number(value) } : score
      );
      setScores(newScores);
    } else {
      setScores([...scores, { name, score: Number(value) }]);
    }
  };

  const handleCheckboxChange = (name: string) => {
    setCheckedTeams((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleUpdate = async (value: number, name: string) => {
    const row = processedData.find((row) => row.date === toDate);
    if (!row) return;
    const formed = row.data.map((entry) => {
      console.log(entry, name);
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
          <th>Edit today</th>
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
                  value={
                    scores.find((score) => score.name === entry.name)?.score
                  }
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
