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
import ConfirmVerifyPage from './pages/auth/confirm_verify.page';
import CreateEventPage from './pages/events/create_event.page';
import WeddingCardPage from './pages/events/wedding_card.page';
import EditDashboardPage from './pages/events/edit/edit_dashboard.page';
import CardDetailPage from './pages/events/edit/card_detail.page';

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
          <Route path="/:nc_wedding_id" element={<WeddingCardPage />} />
          <Route path="/:nc_wedding_id/edit" element={<EditDashboardPage />} />
          <Route path="/:nc_wedding_id/card_detail" element={<CardDetailPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)