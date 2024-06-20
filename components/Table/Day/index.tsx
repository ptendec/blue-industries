import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchDaily, updateDate } from "../../../api/services";
import { useEmployeeVisibilityStore } from "../../../store";
import { valueToEmoji } from "../../../utils/common";
import {
  TransformedData,
  processData,
  revertData,
  splitArray,
} from "../../../utils/data";
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
  const pastDate2 = new Date(currentDate);

  const pastDate = new Date(currentDate);
  const dayOfWeek = pastDate.getDay();
  const startOfWeek =
    pastDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  pastDate.setDate(startOfWeek);

  const toDate = pastDate2.toISOString().split("T")[0];
  const fromDate = pastDate.toISOString().split("T")[0];
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["daily", fromDate, toDate],
    queryFn: () => fetchDaily(fromDate, toDate),
  });
  const { mutateAsync } = useMutation({
    mutationFn: updateDate,
  });

  const { employees, sort, filterBy, setDataForExport } =
    useEmployeeVisibilityStore();

  const [processedData, setProcessedData] = useState<TransformedData[]>([]);
  const [scores, setScores] = useState<Scores[]>([]);

  useEffect(() => {
    const processed = processData(data, sort, employees, filterBy);
    if (
      processed[processed.length - 1]?.date !==
      new Date().toISOString().split("T")[0]
    ) {
      processed.push({
        date: new Date().toISOString().split("T")[0],
        data: [],
      });
    }

    const splitted = splitArray(processed);

    setProcessedData(splitted[0]);
    setScores(splitted[1][0].data);
    setDataForExport(processed);
  }, [data, sort, employees, filterBy]);

  const handleUpdate = async (value: number, name: string) => {
    const updateData = revertData([
      {
        date: new Date(new Date()).toISOString().split("T")[0],
        data: [
          ...scores.filter((score) => score.name !== name),
          {
            name,
            score: Number(value),
          },
        ],
      },
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
                    scores?.find((score) => score.name === entry.name)?.score
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
