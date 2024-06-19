import { useState } from "react";
import styles from "./style.module.css";
import { SharpArrowUp } from "../../SvgIcons/sharp-arrow-up";

interface Props {
  children: React.ReactNode;
  title: string;
}

const FilterAccordion = ({ title, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={styles.header} onClick={toggleAccordion}>
        <span>{title}</span>
        {/* <span>{isOpen ? <SharpArrowUp /> : <SharpArrowUp />}</span> */}
        <SharpArrowUp className={`${styles.icon} ${isOpen ? styles.open : ""}`}/>
      </div>
      <div className={`${styles.content} ${isOpen ? styles.open : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default FilterAccordion;
