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
import Page404 from './pages/error/404.page';
import Page500 from './pages/error/500.page';
import WeddingCardNotFound from './pages/error/WeddingCardNotFound.page';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
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
        <Route path="/404" element={<Page404 />} />
        <Route path="/500" element={<Page500 />} />
        <Route path="/wedding_card_not_found" element={<WeddingCardNotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>
)