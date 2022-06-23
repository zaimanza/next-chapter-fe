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
import EventsPage from './pages/events/events.page';
import ConfirmVerifyPage from './pages/confirm_verify.page';
import CreateEventPage from './pages/events/create_event.page';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/auth" element={<PeopleAuthLayout />} />
          <Route path="/auth/:ticket" element={<PeopleAuthLayout />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/cv/:ticket" element={<ConfirmVerifyPage />} />
          <Route path="/create_event" element={<CreateEventPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)