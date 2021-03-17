import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/main.scss';

ReactDOM.render(
  <React.StrictMode>
    {/* <WeatherProvider> */}
    <App />
    {/* </WeatherProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
