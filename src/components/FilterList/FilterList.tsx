import React, { useState } from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import classes from './FilterList.module.scss';

interface TransferOption {
  value: string;
  id: string | number;
  isChecked: boolean;
}

interface SortTicketsProps {
  hiddenTickets: (isChecked: boolean) => void;
  sortNonStop: (isChecked: boolean) => void;
  sortStops: (id: number, isChecked: boolean) => void;
}

interface FilterListProps {
  sortTickets: SortTicketsProps;
}

export const FilterList: React.FC<FilterListProps> = ({ sortTickets }) => {
  const [transfers, setTransfers] = useState<TransferOption[]>([
    { value: "Все", id: "checkedAll", isChecked: true },
    { value: "Без пересадок", id: "nonStop", isChecked: true },
    { value: "1 пересадка", id: 1, isChecked: true },
    { value: "2 пересадки", id: 2, isChecked: true },
    { value: "3 пересадки", id: 3, isChecked: true }
  ]);

  const checkID = (id: string | number, isChecked: boolean) => {
    if (isChecked) {
      const newChecked = transfers.map(item =>
        item.id === id ? { ...item, isChecked: true } : { ...item }
      );
      setTransfers(newChecked);
    } else {
      const newChecked = transfers.map(item => {
        if (item.id === id || item.id === "checkedAll") {
          return { ...item, isChecked: false };
        } else {
          return { ...item };
        }
      });
      setTransfers(newChecked);
    }
  };

  const changeIsChecked = (id: string | number, isChecked: boolean) => {
    if (id === "checkedAll") {
      if (isChecked) {
        const newChecked = transfers.map(item => ({
          ...item,
          isChecked: true
        }));
        setTransfers(newChecked);
      } else {
        const newChecked = transfers.map(item => ({
          ...item,
          isChecked: false
        }));
        setTransfers(newChecked);
      }
      sortTickets.hiddenTickets(isChecked);
    } else if (id === "nonStop") {
      checkID(id, isChecked);
      sortTickets.sortNonStop(isChecked);
    } else {
      checkID(id, isChecked);
      sortTickets.sortStops(id as number, isChecked);
    }
  };

  return (
    <div className={classes.FilterList}>
      <h2 className={classes.Title}>Количество пересадок</h2>
      <ul>
        {transfers.map(item => (
          <li key={item.id}>
            <Checkbox item={item} checked={changeIsChecked} />
          </li>
        ))}
      </ul>
    </div>
  );
};