import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useEmployeeVisibilityStore } from "../../../store";
import { SharpArrowUp } from "../../SvgIcons/sharp-arrow-up";
import styles from "./style.module.css";
import DownIcon from "/public/icons/down.svg";
import UpIcon from "/public/icons/up.svg";
interface SelectProps {}

const SortSelect: React.FC<SelectProps> = ({}) => {
  const { sort, setSort } = useEmployeeVisibilityStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

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
    <div className={styles.select} ref={selectRef}>
      <div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
        {sort === "None"
          ? "Default"
          : sort === "Ascending"
          ? "Ascending rating"
          : "Descending rating"}
        <SharpArrowUp
          className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
        />
      </div>
      {isOpen && (
        <ul
          style={{
            padding: 0,
          }}
          className={styles.selectOptions}
        >
          <li
            style={{
              listStyle: "none",
            }}
            className={styles.selectOption}
            onClick={() => {
              setSort("None");
              setIsOpen(false);
            }}
          >
            {/* <Image src={UpIcon} alt="" /> */}
            Default
          </li>
          <li
            style={{
              listStyle: "none",
            }}
            className={styles.selectOption}
            onClick={() => {
              setSort("Ascending");
              setIsOpen(false);
            }}
          >
            <Image src={UpIcon} alt="" />
            Ascending rating
          </li>
          <li
            style={{
              listStyle: "none",
            }}
            className={styles.selectOption}
            onClick={() => {
              setSort("Descending");
              setIsOpen(false);
            }}
          >
            <Image src={DownIcon} alt="" />
            Descending rating
          </li>
        </ul>
      )}
    </div>
  );
};

export default SortSelect;
