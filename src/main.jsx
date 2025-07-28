import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
  </StrictMode>
)
