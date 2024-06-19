import React, { useState } from "react";
import styles from "./style.module.css";

interface TabsProps {
  tabs: string[];
  onTabClick: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, onTabClick }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabClick(tab);
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

export default Tabs;
