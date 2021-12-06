import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { store } from './store/index';
import { ChakraProvider } from '@chakra-ui/react'


ReactDOM.render(
  <ChakraProvider>
    <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);

