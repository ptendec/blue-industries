import { useMutation } from "@tanstack/react-query";
import { exportData } from "../../../api/services";
import { useEmployeeVisibilityStore } from "../../../store";
import { createScoreMatrix } from "../../../utils/export";
import { SmileBad } from "../../SvgIcons/smile-bad";
import { SmileGood } from "../../SvgIcons/smile-good";
import { SmileMedium } from "../../SvgIcons/smile-medium";
import ExportSelect from "../ExportSelect";
import SortSelect from "../SortSelect";
import styles from "./style.module.css";

export const BottomFilter = () => {
  const { filterBy, setFilterBy, dataForExport } = useEmployeeVisibilityStore();
  const { mutateAsync } = useMutation({
    mutationFn: exportData,
  });

  const handleSelectChange = async (value: string) => {
    if (value === "Export to Excel") {
      const res = await mutateAsync({
        data: createScoreMatrix(dataForExport),
      });
      const body = await res.json();

      window.location = body.body;
    }
  };

  return (
    <div className={styles.actions}>
      <SortSelect />
      <button
        style={{
          background: "rgba(153, 213, 42, 1)",
          color: "white",
          ...(filterBy === "Best" && {
            border: "3px solid rgba(114, 157, 33, 1)",
          }),
        }}
        onClick={() => setFilterBy(filterBy === "Best" ? "None" : "Best")}
        className={styles.button}
      >
        <span>Best teams</span>
        <SmileGood className={styles.smile} />
      </button>
      <button
        style={{
          background: "rgba(255, 178, 36, 1)",
          color: "white",
          ...(filterBy === "Average" && {
            border: "3px solid rgba(196, 137, 28, 1)",
          }),
        }}
        className={styles.button}
        onClick={() => setFilterBy(filterBy === "Average" ? "None" : "Average")}
      >
        <span>Average Teams</span>
        <SmileMedium className={styles.smile} />
      </button>
      <button
        style={{
          background: "rgba(229, 77, 46, 1)",
          color: "white",
          ...(filterBy === "Low" && {
            border: "3px solid rgba(168, 56, 33, 1)",
          }),
        }}
        className={styles.button}
        onClick={() => setFilterBy(filterBy === "Low" ? "None" : "Low")}
      >
        <span>Low Teams</span>
        <SmileBad className={styles.smile} />
      </button>
      <ExportSelect
        options={["Export to Excel"]}
        placeholder="Export data"
        onChange={handleSelectChange}
      />
    </div>
  );
};
