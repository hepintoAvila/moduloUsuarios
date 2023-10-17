import React from 'react';
import ReactDOM from 'react-dom';

import './i18n';

import App from './App';

import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://90bdb50bd6e1ab7c0c5c0b5b3bc2f775@o4506061832519680.ingest.sentry.io/4506061839400960",
  integrations: [
    new Sentry.BrowserTracing({
        //http://gipnces.compucel.co/
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/gipnces.compucel.co\.io\/api/],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
ReactDOM.render(
    <Provider store={configureStore({})}>
        <App />
    </Provider>,
    document.getElementById('root')
);
