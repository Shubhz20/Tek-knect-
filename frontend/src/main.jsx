import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { GoogleOAuthProvider } from '@react-oauth/google';
 
 // REPLACE 'your_client_id' WITH YOUR ACTUAL GOOGLE CLIENT ID
 const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; 
 // Ensure you have created a Client ID in Google Cloud Console
 
 ReactDOM.createRoot(document.getElementById('root')).render(
     <React.StrictMode>
         <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
             <App />
         </GoogleOAuthProvider>
     </React.StrictMode>,
 )
