import { useDisclosure } from "@mantine/hooks";
import { useEmployeeVisibilityStore } from "../../../store";
import FilterAccordion from "../FilterAccordion";
import Select from "../Select";
import Tabs from "../Tabs";
import styles from "./style.module.css";
import { EyeIcon } from "../../SvgIcons/eye";
import { EyeHideIcon } from "../../SvgIcons/eye-hide";
import FilterTabs from "../FilterTabs";

export const Filter = () => {
  const [opened, { toggle }] = useDisclosure(false);
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
          tabs={["Week", "4 weeks", "1 month", "1 year"]}
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
        </div>
      </div>
    </div>
  );
  // return (
  //   <Box>
  //     <Group mb={5}>
  //       <Button onClick={toggle}>Filter &gt; </Button>
  //     </Group>
  //     <Collapse in={opened}>
  //       <Group justify="center">
  //         {Object.entries(employees).map(([employee, value]) => (
  //           <Button
  //             style={{
  //               background: "transparent",
  //               color: "black",
  //             }}
  //             key={employee}
  //             onClick={() => toggleEmployee(employee)}
  //           >
  //             {employee} {value ? "✅" : "❌"}
  //           </Button>
  //         ))}
  //       </Group>
  //       <Flex direction="row" gap={12} align="end">
  //         <Select
  //           label="Sort"
  //           defaultValue="None"
  //           data={["Ascending", "Descending", "None"]}
  //           onChange={(value) =>
  //             value && setSort(value as "Ascending" | "Descending" | "None")
  //           }
  //         />
  //         <Button
  //           style={{
  //             background: filterBy === "Best" ? "green" : "",
  //           }}
  //           onClick={() => setFilterBy(filterBy === "Best" ? "None" : "Best")}
  //         >
  //           Best teams
  //         </Button>
  //         <Button
  //           style={{
  //             background: filterBy === "Average" ? "green" : "",
  //           }}
  //           onClick={() =>
  //             setFilterBy(filterBy === "Average" ? "None" : "Average")
  //           }
  //         >
  //           Average teams
  //         </Button>
  //         <Button
  //           style={{
  //             background: filterBy === "Low" ? "green" : "",
  //           }}
  //           onClick={() => setFilterBy(filterBy === "Low" ? "None" : "Low")}
  //         >
  //           Low teams
  //         </Button>
  //         <Button disabled>Export data</Button>
  //       </Flex>
  //     </Collapse>
  //   </Box>
  // );
};
