import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { SharpArrowUp } from "../../SvgIcons/sharp-arrow-up";

interface SelectProps {
  options: string[];
  placeholder: string;
  onChange: (option: string) => void;
  showArrow?: boolean;
  className?: string;
  value?: string;
}

const ExportSelect: React.FC<SelectProps> = ({
  options,
  placeholder,
  onChange,
  showArrow = true,
  className,
  value,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(value || "");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setSelectedOption(value || "");
  }, [value]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className={`${styles.select} ${className}`}>
      <div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || placeholder}
        {showArrow && (
          // <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
          <SharpArrowUp className={`${styles.arrow} ${isOpen ? styles.open : ""}`}/>
        )}
      </div>
      {isOpen && (
        <ul
          style={{
            padding: 0,
          }}
          className={styles.selectOptions}
        >
          {options.map((option, index) => (
            <li
              style={{
                listStyle: "none",
              }}
              key={index}
              className={styles.selectOption}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExportSelect;
