import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Assuming you have a global CSS file
import { Analytics } from '@vercel/analytics/react';

// This line initializes the i18next instance
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback="Loading...">
      <App />
      <Analytics />
    </Suspense>
  </React.StrictMode>,
);