import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './providers';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import WelcomePage from './pages/welcome.page';
import PeopleAuthLayout from './layouts/people.auth.layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/auth" element={<PeopleAuthLayout />} />
          <Route path="/auth/:ticket" element={<PeopleAuthLayout />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)