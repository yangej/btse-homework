import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import App from './App.tsx';
import './index.css';
import WebSocketContextProvider from './modules/common/web-sockets/components/WebSocketContextProvider.tsx';
import { theme } from './theme/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <WebSocketContextProvider>
        <App />
      </WebSocketContextProvider>
    </ThemeProvider>
  </StrictMode>,
);
