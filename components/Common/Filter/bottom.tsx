import { useEmployeeVisibilityStore } from "../../../store";
import ExportSelect from "../ExportSelect";
import Select from "../Select";
import SortSelect from "../SortSelect";
import styles from "./style.module.css";

export const BottomFilter = ({ handleSelectChange }: any) => {
  const { filterBy, setFilterBy } = useEmployeeVisibilityStore();

  return (
    <div className={styles.actions}>
      <SortSelect
        options={["Ascending grade", "Decreasing rating"]}
        placeholder="Sort by ..."
        onChange={handleSelectChange}
      />
      <button
        style={{
          background: "rgba(153, 213, 42, 1)",
          color: "white",
          ...(filterBy === "Best" && {
            border: "2px solid rgba(114, 157, 33, 1)",
          }),
        }}
        onClick={() => setFilterBy(filterBy === "Best" ? "None" : "Best")}
        className={styles.button}
      >
        Best teams 😊
      </button>
      <button
        style={{
          background: "rgba(255, 178, 36, 1)",
          color: "white",
          ...(filterBy === "Average" && {
            border: "2px solid rgba(196, 137, 28, 1)",
          }),
        }}
        className={styles.button}
        onClick={() => setFilterBy(filterBy === "Average" ? "None" : "Average")}
      >
        Average Teams 😐
      </button>
      <button
        style={{
          background: "rgba(229, 77, 46, 1)",
          color: "white",
          ...(filterBy === "Low" && {
            border: "2px solid rgba(168, 56, 33, 1)",
          }),
        }}
        className={styles.button}
        onClick={() => setFilterBy(filterBy === "Low" ? "None" : "Low")}
      >
        Low Teams 😠
      </button>
      <ExportSelect
        options={["Export to PDF", "Export to Excel"]}
        placeholder="Export data"
        onChange={handleSelectChange}
      />
    </div>
  );
};
