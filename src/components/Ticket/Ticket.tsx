import React from 'react';
import classes from './Ticket.module.scss';
import type { Ticket } from '../../types/ticket';

export const TicketComponent: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  const picAvs = "http://pics.avs.io/99/36/";

  const splitTimeOut = (str: string, dur: number): string => {
    const [, time] = str.slice(0, -1).split("T");
    const [h, m] = time.split(":");
    const sum = Number(h) * 60 + Number(m) + dur;
    const newH = sum / 60 >= 24 ? Math.floor(sum / 60 - 24) : Math.floor(sum / 60);
    const newM = sum % 60;
    const formH = newH < 10 ? `0${newH}` : newH;
    const formM = newM < 10 ? `0${newM}` : newM;
    return `${h}:${m} - ${formH}:${formM}`;
  };

  const durationFunc = (number: number): string => {
    const hours = Math.round(number / 60);
    const minutes = number % 60;
    return `${hours}ч : ${minutes}м`;
  };

  return (
    <div className={classes.ticket}>
      <div className={classes.ticketHeader}>
        <div className={classes.ticketPrice}>{`${ticket.price.toLocaleString()} Р`}</div>
        <div className={classes.ticketCarrier}>
          <img src={`${picAvs}${ticket.carrier}.png`} alt={ticket.carrier} />
        </div>
      </div>
      <div className={classes.ticketBody}>
        {ticket.segments.map((item, i) => (
          <div className={classes.bodyRow} key={`segmentRow-${i}`}>
            <div>
              <span className={classes.titleRow}>
                {item.origin} – {item.destination}
              </span>
              <span className={classes.textRow}>
                {splitTimeOut(item.date, item.duration)}
              </span>
            </div>
            <div>
              <span className={classes.titleRow}>В пути</span>
              <span className={classes.textRow}>
                {durationFunc(item.duration)}
              </span>
            </div>
            <div>
              <span className={classes.titleRow}>
                {item.stops.length > 0
                  ? `${item.stops.length} пересадк${
                      item.stops.length === 1 ? "а" : "и"
                    }`
                  : "Без пересадок"}
              </span>
              <span className={classes.textRow}>{item.stops.join(", ")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};