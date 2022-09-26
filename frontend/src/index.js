import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from './extendTheme';
import { Auth0Provider } from '@auth0/auth0-react';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </Auth0Provider>
);
