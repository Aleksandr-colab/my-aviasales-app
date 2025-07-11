import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { ThemeProvider } from './ThemeContext/ThemeContext';
import App from './App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);


