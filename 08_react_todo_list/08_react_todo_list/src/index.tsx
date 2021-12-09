import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {App} from 'Pages';
import store from 'ReduxStore';
import './style/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
