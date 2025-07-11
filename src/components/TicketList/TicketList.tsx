import React from 'react';
import { TicketComponent } from '../Ticket/Ticket';
import classes from './TicketList.module.scss';
import type { Ticket } from '../../types/ticket';

interface TicketListProps {
  tickets: Ticket[];
}

export const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  return (
    <ul className={classes.TicketList}>
      {tickets.map((item, i) => (
        <li key={`ticketKey-${i}`}>
          <TicketComponent ticket={item} />
        </li>
      ))}
    </ul>
  );
};