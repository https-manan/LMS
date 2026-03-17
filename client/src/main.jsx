import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from '@reduxjs/toolkit'
import { appStore } from './app/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </StrictMode>,
)
