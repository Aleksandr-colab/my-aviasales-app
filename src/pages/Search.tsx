import React, { useState, useEffect } from 'react';
import classes from './Search.module.scss';
import { FilterList } from '../components/FilterList/FilterList';
import { TicketList } from '../components/TicketList/TicketList';
import { Sorting } from '../components/Sorting/Sorting';
import { Alert } from '../components/Alert/Alert';
import testData from './testData.json';

export interface Segment {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
}

export interface Ticket {
  price: number;
  carrier: string;
  segments: Segment[];
}

export const Search: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [cloneTickets, setCloneTickets] = useState<Ticket[] | null>(null);
  const [selectTub, setSelectTub] = useState<string>('low price');
  const [sortTickets, setSortTickets] = useState<Ticket[] | null>(null);

  useEffect(() => {
    try {
      setTickets(testData);
      setCloneTickets(testData.slice(0, 5));
    } catch (err) {
      setHasError(true);
    }
  }, []);

  useEffect(() => {
    if (!cloneTickets) return;

    if (selectTub === 'low price') {
      const sorted = [...cloneTickets].sort((a, b) => a.price - b.price);
      setSortTickets(sorted);
    }

    if (selectTub === 'fastest') {
      const sorted = [...cloneTickets].sort((a, b) => {
        const sumA = a.segments.reduce((acc, seg) => acc + seg.duration, 0);
        const sumB = b.segments.reduce((acc, seg) => acc + seg.duration, 0);
        return sumA - sumB;
      });
      setSortTickets(sorted);
    }
  }, [cloneTickets, selectTub]);

  const hiddenTickets = (isChecked: boolean) => {
    isChecked ? setCloneTickets(tickets) : setCloneTickets([]);
  };

  const sortNonStop = (isChecked: boolean) => {
    if (isChecked) {
      const filtered = tickets.filter(ticket =>
        ticket.segments.every(seg => seg.stops.length === 0)
      );
      setCloneTickets(prev => (prev ? [...prev, ...filtered] : filtered));
    } else {
      const filtered = cloneTickets?.filter(ticket =>
        ticket.segments.some(seg => seg.stops.length > 0)
      ) || [];
      setCloneTickets(filtered);
    }
  };

  const sortStops = (numb: number, isChecked: boolean) => {
    if (isChecked) {
      const filtered = tickets.filter(ticket =>
        ticket.segments.some(seg => seg.stops.length === numb) &&
        ticket.segments.every(seg => seg.stops.length <= numb)
      );
      setCloneTickets(prev => (prev ? [...prev, ...filtered] : filtered));
    } else {
      const filtered = cloneTickets?.filter(ticket =>
        ticket.segments.some(seg => seg.stops.length > numb) ||
        ticket.segments.every(seg => seg.stops.length < numb)
      ) || [];
      setCloneTickets(filtered);
    }
  };

  const sortTabs = (id: string) => {
    setSelectTub(id);
  };

  return (
    <div className={classes.appContentInner}>
      <div className={classes.appInformer}>
        <FilterList sortTickets={{ hiddenTickets, sortNonStop, sortStops }} />
      </div>
      <div className={classes.appContent}>
        <div className={classes.sorting}>
          <Sorting sorts={{ sortTabs }} />
        </div>
        {sortTickets ? (
          <TicketList tickets={sortTickets} />
        ) : hasError ? (
          <Alert />
        ) : null}
      </div>
    </div>
  );
};