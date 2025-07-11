import React from 'react';
import classes from './Alert.module.scss';

export const Alert: React.FC = () => {
  return (
    <div className={classes.Alert}>
      <span>😟 Что-то пошло не так</span>
      <button onClick={() => window.location.reload()}>Обновить страницу</button>
    </div>
  );
};