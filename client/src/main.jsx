import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './Context/DataContext.jsx'
import { ThemeProvider } from './Context/ThemeContext.jsx'
import { WishlistProvider } from './Context/WishlistContext.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <ThemeProvider>
        <WishlistProvider>
          <ToastContainer />
          <App />
        </WishlistProvider>
      </ThemeProvider>    
    </DataProvider>
  </StrictMode>,
)

