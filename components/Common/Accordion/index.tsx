import { useState } from "react";
import styles from "./style.module.css";

interface Props {
  children: React.ReactNode;
  title: string;
}

const Accordion = ({ title, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionHeader} onClick={toggleAccordion}>
        <span>{title}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      <div
        className={`${styles.accordionContent} ${isOpen ? styles.open : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
