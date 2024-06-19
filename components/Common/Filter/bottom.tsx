import { useDisclosure } from "@mantine/hooks";
import { useEmployeeVisibilityStore } from "../../../store";
import FilterAccordion from "../FilterAccordion";
import Select from "../Select";
import styles from "./style.module.css";
import { EyeIcon } from "../../SvgIcons/eye";
import { EyeHideIcon } from "../../SvgIcons/eye-hide";
import FilterTabs from "../FilterTabs";
import SortSelect from "../SortSelect";

export const BottomFilter = ({ handleSelectChange }: any) => {
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
            }}
            className={styles.button}
          >
            Best teams 😊
          </button>
          <button
            style={{
              background: "rgba(255, 178, 36, 1)",
              color: "white",
            }}
            className={styles.button}
          >
            Average Teams 😐
          </button>
          <button
            style={{
              background: "rgba(229, 77, 46, 1)",
              color: "white",
            }}
            className={styles.button}
          >
            Low Teams 😠
          </button>
          <Select
            options={["Export to PDF", "Export to Excel"]}
            placeholder="Export data"
            onChange={handleSelectChange}
          />
    </div>
  )
}