import React, { useContext } from 'react';
import classes from './ThemeSwitcher.module.scss';
import { ThemeContext } from '../../ThemeContext/ThemeContext';

// Опционально: создаем тип для контекста, чтобы явно указать структуру
interface ThemeContextType {
  dark: boolean;
  toggle: () => void;
}

export const ThemeSwitcher: React.FC = () => {
  const { dark, toggle } = useContext<ThemeContextType>(ThemeContext);

  return (
    <div className={classes.Switcher}>
      <input
        type="checkbox"
        id="theme-switcher"
        className={classes.SwitcherInput}
        checked={dark}
        onChange={toggle}
      />
      <label htmlFor="theme-switcher" className={classes.SwitcherLabel}>
        <span className={classes.SwitcherToggle}></span>
      </label>
    </div>
  );
};