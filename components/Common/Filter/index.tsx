import { useEmployeeVisibilityStore } from "../../../store";
import { EyeIcon } from "../../SvgIcons/eye";
import { EyeHideIcon } from "../../SvgIcons/eye-hide";
import FilterAccordion from "../FilterAccordion";
import FilterTabs from "../FilterTabs";
import { BottomFilter } from "./bottom";
import styles from "./style.module.css";

export const Filter = () => {
  const { employees, toggleEmployee } = useEmployeeVisibilityStore();

  const handleTabClick = (tab: string) => {
    console.log("Selected tab:", tab);
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.mainTitle}>Team effectiveness</h1>
        <div className={styles.filterBlocks}>
          <FilterTabs
            tabs={["Week", "4 weeks", "Month", "Year"]}
            onTabClick={handleTabClick}
          />
          <FilterAccordion title="Filters">
            <h4 className={styles.filtersTitle}>Show and hide Teams</h4>
            <div>
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
              <BottomFilter />
            </div>
          </FilterAccordion>
        </div>
      </div>
    </div>
  );
};
