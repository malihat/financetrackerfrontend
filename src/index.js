import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react'; 
import { TotalMoneyProvider } from './TotalMoneyContext';
// import dotenv from 'dotenv'
// dotenv.config()

// const vite_key = "pk_test_Z3JhdGVmdWwtdG9ydG9pc2UtNTQuY2xlcmsuYWNjb3VudHMuZGV2JA"

// if (!vite_key) {
//   throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY environment variable');
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TotalMoneyProvider >
      {/* <ClerkProvider publishableKey={vite_key}> */}
        <App />
      {/* </ClerkProvider> */}
    </TotalMoneyProvider>
  </React.StrictMode>
);


