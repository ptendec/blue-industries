import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

interface Option {
  value: number;
  label: string | React.ReactNode | JSX.Element;
}

interface SelectProps {
  value?: number;
  onChange: (option: Option) => void;
  options: Option[];
}

const Select: React.FC<SelectProps> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<
    string | React.ReactNode | JSX.Element
  >("Rate");
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      const selectedOption = options.find((option) => option.value === value);
      if (selectedOption) {
        setSelectedLabel(selectedOption.label);
      }
    } else {
      setSelectedLabel("Rate");
    }
  }, [value, options]);

  const handleOptionClick = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.selectContainer} ref={selectRef}>
      <div className={styles.selectDisplay} onClick={() => setIsOpen(!isOpen)}>
        {selectedLabel}
      </div>
      {isOpen && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
          }}
          className={styles.selectOptions}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.selectOption}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
