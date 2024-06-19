import React from "react";
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
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    if (selectedOption) {
      onChange(selectedOption);
    }
  };

  return (
    <select
      className={`${styles.select} ${
        value === undefined ? styles.placeholder : ""
      }`}
      value={value !== undefined ? value : "Rate"}
      onChange={handleChange}
    >
      {value === undefined && <option value="Rate">Rate</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
