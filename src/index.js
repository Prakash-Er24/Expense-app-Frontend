import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/configureStore';

const store = configureStore()
// console.log(store.getState())
// store.subscribe(()=>{
//       console.log(store.getState())
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Provider store={store}>
            <App />
      </Provider>
);


