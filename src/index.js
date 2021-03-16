import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { WeatherProvider } from './store/WeatherContext';

ReactDOM.render(
  <React.StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
