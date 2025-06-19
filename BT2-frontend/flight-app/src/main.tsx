import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
//import FlightSearch from './components/FlightSearch.tsx'
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="container">
      <App />  
    </div>
    
  </StrictMode>,
)
