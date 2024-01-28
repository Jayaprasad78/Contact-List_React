import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Reducer from './reducers/reducer';
import 'react-toastify/dist/ReactToastify.css';
// import { ToastProvider } from 'react-toast-notifications';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';



const store = createStore(Reducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   <Router>
    <App/>
   </Router>
  </Provider>
  
);