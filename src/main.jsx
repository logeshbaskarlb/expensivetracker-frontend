import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GlobalProvider } from './context/globalContext.jsx'
import { GlobalStyle } from "./styles/GlobalStyle.jsx"
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
      <GlobalProvider>
        <App />
      </GlobalProvider>
  </StrictMode>,
)
