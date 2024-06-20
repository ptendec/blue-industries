import React, { useState } from "react";
import { useEmployeeVisibilityStore } from "../../../store";
import styles from "./style.module.css";

interface TabsProps {
  tabs: string[];
  onTabClick: (tab: string) => void;
}

const FilterTabs: React.FC<TabsProps> = ({ tabs, onTabClick }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const { setType } = useEmployeeVisibilityStore();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabClick(tab);
    switch (tab) {
      case "Week":
        setType("week");
        break;
      case "4 weeks":
        setType("4 week");
        break;
      case "Month":
        setType("month");
        break;
      case "Year":
        setType("year");
        break;
    }
  };

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
