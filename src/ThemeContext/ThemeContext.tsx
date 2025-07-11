import React, { createContext, useState, useLayoutEffect } from 'react';

export type Theme = {
  dark: boolean;
  toggle: () => void;
};

export const lightTheme = [
  "--background-app: #f3f7fa",
  "--body-text: #4A4A4A",
  "--box-shadow: rgba(0, 0, 0, 0.1)",
  "--filter-background: #fff",
  "--filter-hover-item: #F1FCFF",
  "--checkbox-box: rgba(154, 187, 206, 1)",
  "--checkbox-box-check: #2196F3",
  "--sorting-tab-background: #fff",
  "--sorting-tab-background-active: #2196F3",
  "--sorting-tab-background-hover: #F1FCFF",
  "--sorting-tab-text-active: #fff",
  "--sorting-tab-border: #DFE5EC",
  "--sorting-tab-border-hover: #2196F3",
  "--ticket-background: #fff",
  "--ticket-price: #2196F3",
  "--ticket-text-subtitle: #A0B0B9"
];

export const darkTheme = [
  "--background-app: #05263f",
  "--body-text: #fff",
  "--box-shadow: rgba(0, 0, 0, 0.1)",
  "--filter-background: #1e3c52",
  "--filter-hover-item: #355064",
  "--checkbox-box: rgba(154, 187, 206, 1)",
  "--checkbox-box-check: #2196F3",
  "--sorting-tab-background: #1e3c52",
  "--sorting-tab-background-active: #2196f3",
  "--sorting-tab-background-hover: #031b2c",
  "--sorting-tab-text-active: #fff",
  "--sorting-tab-border: #000",
  "--sorting-tab-border-hover: #000",
  "--ticket-background: #1e3c52",
  "--ticket-price: #f57c00",
  "--ticket-text-subtitle: #A0B0B9"
];

export const ThemeContext = createContext<Theme>({
  dark: false,
  toggle: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [dark, setDark] = useState<boolean>(false);

  const applyTheme = (theme: string[]) => {
    const root = document.getElementsByTagName('html')[0];
    root.style.cssText = theme.join(';');
  };

  useLayoutEffect(() => {
    const lastTheme = window.localStorage.getItem('darkTheme');
    if (lastTheme === 'true') {
      setDark(true);
      applyTheme(darkTheme);
    } else {
      setDark(false);
      applyTheme(lightTheme);
    }
  }, []);

  const toggle = () => {
    const newThemeState = !dark;
    setDark(newThemeState);
    window.localStorage.setItem('darkTheme', String(newThemeState));
    applyTheme(newThemeState ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};