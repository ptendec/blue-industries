import { useEmployeeVisibilityStore } from "../../../store";
import styles from "./style.module.css";
import { EyeIcon } from "../../SvgIcons/eye";
import { EyeHideIcon } from "../../SvgIcons/eye-hide";
import FilterAccordion from "../FilterAccordion";
import FilterTabs from "../FilterTabs";
import SortSelect from "../SortSelect";
import { BottomFilter } from "./bottom";

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
              <BottomFilter handleSelectChange={handleSelectChange}/>
            </div>
        </FilterAccordion>

        </div>
      </div>
    </div>
  );
};
