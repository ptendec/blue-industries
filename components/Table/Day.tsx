import { Checkbox, Flex, Select, Table } from "@mantine/core";
import React, { useState } from "react";
import { useEmployeeVisibilityStore } from "../../store";
import { valueToEmoji } from "../../utils/common";
import { Data, TransformedData, processData } from "../../utils/data";
import { formatDate } from "../../utils/date";

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

const Day: React.FC = () => {
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
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th></Table.Th>
          {processedData.map((row) => (
            <Table.Th key={row.date}>{formatDate(row.date)}</Table.Th>
          ))}
          <Table.Th>Select Emoji</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {processedData[0].data.map((entry) => (
          <Table.Tr key={entry.name}>
            <Table.Td>
              <Flex gap={4} align="center">
                <Checkbox
                  checked={checkedTeams[entry.name] || false}
                  onChange={() => handleCheckboxChange(entry.name)}
                />
                {entry.name}
              </Flex>
            </Table.Td>
            {processedData.map((row) => {
              const dataItem = row.data.find((d) => d.name === entry.name);
              return (
                <Table.Td key={`${row.date}-${entry.name}`}>
                  {dataItem ? valueToEmoji(dataItem.score) : null}
                </Table.Td>
              );
            })}
            <Table.Td>
              {isWorkingDay(new Date().toISOString().split("T")[0]) && (
                <Select
                  placeholder="Select Emoji"
                  data={[
                    { value: "3", label: "🙂" },
                    { value: "2", label: "😐" },
                    { value: "1", label: "😡" },
                  ]}
                  value={selectValues[
                    new Date().toISOString().split("T")[0]
                  ]?.toString()}
                  onChange={(value) =>
                    handleSelectChange(
                      new Date().toISOString().split("T")[0],
                      entry.name,
                      value as string
                    )
                  }
                />
              )}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default Day;
