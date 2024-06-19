import React, { useState } from "react";
import styles from "./style.module.css";

interface SelectProps {
  options: string[];
  placeholder: string;
  onChange: (option: string) => void;
  showArrow?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder,
  onChange,
  showArrow = true,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className={styles.select}>
      <div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || placeholder}
        {showArrow && (
          <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
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

export default Select;
