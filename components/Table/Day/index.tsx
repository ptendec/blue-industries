import React, { useState } from "react";
import { useEmployeeVisibilityStore } from "../../../store";
import { valueToEmoji } from "../../../utils/common";
import { Data, TransformedData, processData } from "../../../utils/data";
import { formatDate } from "../../../utils/date";
import Select from "../../Common/Select";
import styles from "./style.module.css";
const initialData: Data[] = [
  {
    date: "2024-06-03",
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
    date: "2024-06-10",
    Cut: 1,
    Temp: 2,
    Pol: 3,
    CNC: 3,
    IG: 1,
    Lami: 3,
    Span: 2,
    Crating: 3,
    Loading: 2,
  },
  {
    date: "2024-06-17",
    Cut: 2,
    Temp: 3,
    Pol: 1,
    CNC: 2,
    IG: 2,
    Lami: 1,
    Span: 2,
    Crating: 1,
    Loading: 2,
  },
  {
    date: "2024-06-24",
    Cut: 3,
    Temp: 2,
    Pol: 2,
    CNC: 3,
    IG: 3,
    Lami: 2,
    Span: 1,
    Crating: 3,
    Loading: 1,
  },
  {
    date: "2024-07-01",
    Cut: 3,
    Temp: 1,
    Pol: 2,
    CNC: 2,
    IG: 1,
    Lami: 3,
    Span: 2,
    Crating: 1,
    Loading: 1,
  },
  {
    date: "2024-07-08",
    Cut: 1,
    Temp: 2,
    Pol: 3,
    CNC: 2,
    IG: 3,
    Lami: 3,
    Span: 3,
    Crating: 3,
    Loading: 1,
  },
  {
    date: "2024-07-15",
    Cut: 2,
    Temp: 3,
    Pol: 3,
    CNC: 2,
    IG: 3,
    Lami: 3,
    Span: 2,
    Crating: 2,
    Loading: 1,
  },
  {
    date: "2024-07-22",
    Cut: 2,
    Temp: 1,
    Pol: 1,
    CNC: 1,
    IG: 3,
    Lami: 1,
    Span: 1,
    Crating: 3,
    Loading: 2,
  },
  {
    date: "2024-07-29",
    Cut: 1,
    Temp: 1,
    Pol: 2,
    CNC: 3,
    IG: 3,
    Lami: 2,
    Span: 2,
    Crating: 2,
    Loading: 1,
  },
];

export const Day: React.FC = () => {
  const { employees, sort, filterBy } = useEmployeeVisibilityStore();
  const processedData = processData(initialData, sort, employees, filterBy);

  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [checkedTeams, setCheckedTeams] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [scores, setScores] = useState<TransformedData[]>(processedData);
  const [selectValues, setSelectValues] = useState<{
    [date: string]: number | null;
  }>({});

  const handleSelectChange = (date: string, name: string, value: string) => {
    const score = parseInt(value);
    if (score !== null) {
      if (Object.keys(checkedTeams).length > 0) {
        // Apply to all checked teams
        const updatedScores = scores.map((row) => ({
          ...row,
          data: row.data.map((item) =>
            checkedTeams[item.name] ? { ...item, score } : item
          ),
        }));
        setScores(updatedScores);
        setCheckedTeams({});
      } else {
        // Apply to a single team
        const updatedScores = scores.map((row) =>
          row.date === date
            ? {
                ...row,
                data: row.data.map((item) =>
                  item.name === name ? { ...item, score } : item
                ),
              }
            : row
        );
        setScores(updatedScores);
      }
      setSelectedEmoji(score);
    }
  };

  const isWorkingDay = (date: string) => {
    const day = new Date(date).getDay();
    return day !== 0 && day !== 6; // Not Sunday (0) or Saturday (6)
  };

  const handleCheckboxChange = (name: string) => {
    setCheckedTeams((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

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
          <th>Select Emoji</th>
        </tr>
      </thead>
      <tbody>
        {processedData[0].data.map((entry) => (
          <tr key={entry.name}>
            <td className={styles.td}>
              <div className={styles.flex}>
                <input
                  type="checkbox"
                  checked={checkedTeams[entry.name] || false}
                  onChange={() => handleCheckboxChange(entry.name)}
                />
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
                  placeholder="Rate"
                  className={styles.select}
                  value={
                    selectValues[
                      new Date().toISOString().split("T")[0]
                    ]?.toString() || ""
                  }
                  onChange={(value) =>
                    handleSelectChange(
                      new Date().toISOString().split("T")[0],
                      entry.name,
                      value
                    )
                  }
                  options={["🙂", "😐", "😡"]}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
