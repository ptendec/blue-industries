import React, { useState } from "react";
import { useEmployeeVisibilityStore } from "../../../store";
import { valueToEmoji } from "../../../utils/common";
import { Data, processData } from "../../../utils/data";
import { formatDate, isWorkingDay } from "../../../utils/date";
import Select from "../../Common/Select";
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
  const { employees, sort, filterBy } = useEmployeeVisibilityStore();
  const processedData = processData(initialData, sort, employees, filterBy);

  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [checkedTeams, setCheckedTeams] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [scores, setScores] = useState<Scores[]>([]);

  const handleSelectChange = (date: string, name: string, value: string) => {
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
                  {...{
                    ...(scores.find((score) => score.name === entry.name) && {
                      value: scores
                        .find((score) => score.name === entry.name)
                        ?.score.toString(),
                    }),
                  }}
                  onChange={(value) =>
                    handleSelectChange(
                      new Date().toISOString().split("T")[0],
                      entry.name,
                      value
                    )
                  }
                  options={["1", "2", "3"]}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
