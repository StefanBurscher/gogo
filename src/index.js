import React from 'react';
import ReactDOM from 'react-dom';
const rootEl = document.getElementById("root");
import Axios from "axios";

Axios.defaults.withCredentials = true;
Axios.defaults.headers["X-Requested-With"] = 'XMLHttpRequest';
// Axios.defaults.headers["crossDomain"] = true;
// Axios.defaults.crossDomain = true;


let render = () => {
  const MainApp = require('./App').default;
  ReactDOM.render(
    <MainApp />,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(
      <NextApp />,
      rootEl
    );
  });
}

render() 