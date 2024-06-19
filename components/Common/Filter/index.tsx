import { useEmployeeVisibilityStore } from "../../../store";
import { EyeIcon } from "../../SvgIcons/eye";
import { EyeHideIcon } from "../../SvgIcons/eye-hide";
import FilterAccordion from "../FilterAccordion";
import FilterTabs from "../FilterTabs";
import Select from "../Select";
import styles from "./style.module.css";

export const Filter = () => {
  const { employees, toggleEmployee, setSort, setFilterBy, filterBy } =
    useEmployeeVisibilityStore();

  const handleSelectChange = (option: string) => {
    switch (option) {
      case "Ascending grade":
        return setSort("Ascending");
      case "Decreasing rating":
        return setSort("Descending");
      default:
        return setSort("None");
    }
  };

  const handleTabClick = (tab: string) => {
    console.log("Selected tab:", tab);
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.mainTitle}>Team effectiveness</h1>
        <div className={styles.filterBlocks}>
          <FilterTabs
            tabs={["Week", "4 weeks", "1 year"]}
            onTabClick={handleTabClick}
          />

          <FilterAccordion title="Filters">
            <h4 className={styles.filtersTitle}>Show and hide Teams</h4>
            <div className={styles.filtersContainer}>
              {Object.entries(employees).map(([employee, value]) => (
                <div
                  className={styles.filterItem}
                  key={employee}
                  onClick={() => toggleEmployee(employee)}
                >
                  {employee}
                  {value ? <EyeIcon /> : <EyeHideIcon />}
                </div>
              ))}
            </div>
          </FilterAccordion>

          <div className={styles.actions}>
            <Select
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
              className={styles.button}
              onClick={() => setFilterBy(filterBy === "Best" ? "None" : "Best")}
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
              onClick={() =>
                setFilterBy(filterBy === "Average" ? "None" : "Average")
              }
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
            <Select
              options={["Export to PDF", "Export to Excel"]}
              placeholder="Export data"
              onChange={handleSelectChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
