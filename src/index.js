import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import { extendedApiSlice } from './features/posts/postsSlice';
import { usersApiSlice } from './features/users/usersSlice'

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());
store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={ <App />}/>
        </Routes>
     
      </Router>
      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
