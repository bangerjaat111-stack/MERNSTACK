import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './Context/DataContext.jsx'
import { ThemeProvider } from './Context/ThemeContext.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <ThemeProvider>
        <ToastContainer />
          <App />
        
      </ThemeProvider>    
    </DataProvider>
  </StrictMode>,
)
