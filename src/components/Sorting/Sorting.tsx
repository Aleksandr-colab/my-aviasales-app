import React, { useState } from 'react';
import classes from './Sorting.module.scss';

interface SortingProps {
  sorts: {
    sortTabs: (id: string) => void;
  };
}

export const Sorting: React.FC<SortingProps> = ({ sorts }) => {
  const [selectTub, setSelectTub] = useState("low price");

  const paramSorting = [
    { value: "Самый дешевый", id: "low price" },
    { value: "Самый быстрый", id: "fastest" }
  ];

  const checkTub = (id: string) => {
    if (id === selectTub) return;
    setSelectTub(id);
    sorts.sortTabs(id);
  };

  return (
    <div>
      <ul className={classes.SortingTabs}>
        {paramSorting.map(elem => (
          <li
            key={elem.id}
            className={
              selectTub === elem.id
                ? `${classes.SortingTab} ${classes.SortingTab_active}`
                : classes.SortingTab
            }
            onClick={() => checkTub(elem.id)}
          >
            <span className={classes.SortingTitle}>{elem.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};